const { resolve } = require("path");

/**
 * 1. promise 成功和失败的返回值都会传到下个then里面
 * 2. 如果不管fulfilled 和 reject 回调 返回一个普通值(传递到下一个then成功态)，若出错了会一定会传递到失败态，若返回的的是一个promise 会取决于这个promise的状态分发给下个then
   3. 错误处理，如果距离自己最近的then没有reject，它会向下处理。
   4. 每次执行完promise 会返回一个新的promise
 */
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
const PENDING = "PENDING";

const resolvePromise = function (x, promise2, resolve, reject) {
	//1.循环引用，自己等待自己，类型错误
	if (promise2 === x) {
		return reject(
			new TypeError("Chaining cycle detected for promise #<Promise>")
		);
	}
	//以下逻辑是兼容其他人promise
	if ((typeof x == "object" && x != null) || typeof x === "function") {
		//有可能是promise
		let called;
		try {
			let then = x.then;
			if (typeof then == "function") {
				//根据X的值判断成功还是失败
				then.call(
					x,
					(y) => {
						if (called) return;
						called = true; //防止别人的promise成功后又调用失败
						resolvePromise(y, promise2, resolve, reject);
					},
					(r) => {
						if (called) return;
						called = true;
						reject(r);
					}
				);
			} else {
				//{then:{12}}是普通值
				resolve(x);
			}
		} catch (e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		//普通值
		resolve(x);
	}
};
class Promise {
	constructor(executor) {
		this.status = PENDING;
		this.reason = undefined;
		this.value = undefined;
		this.onFulfilledCallback = [];
		this.onRejectedCallback = [];
		const resolve = (value) => {
			if (value instanceof Promise) {
				// 如果value 是一个promise，那我们的库中应该也要实现一个递归解析
				return value.then(resolve, reject);
			}
			if (this.status == PENDING) {
				this.value = value;
				this.status = RESOLVED;
				this.onFulfilledCallback.forEach((fn) => fn());
			}
		};
		const reject = (reason) => {
			if (this.status == PENDING) {
				this.reason = reason;
				this.status = REJECTED;
				this.onRejectedCallback.forEach((fn) => fn());
			}
		};

		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}
	then(onFulfilled, onRejected) {
		onFulfilled = typeof onFulfilled == "function" ? onFulfilled : v => v;
		onRejected = typeof onRejected == "function" ? onRejected : err => { throw err };
		let promise2 = new Promise((resolve, reject) => {
			if (this.status == RESOLVED) {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.value); //x可能是普通值和promise
						resolvePromise(x, promise2, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			}
			if (this.status == REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason);
						resolvePromise(x, promise2, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			}

			if (this.status == PENDING) {
				//这里是异步的
				this.onFulfilledCallback.push(() => {
					//todo
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value);
							resolvePromise(x, promise2, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
				this.onRejectedCallback.push(() => {
					//todo
					setTimeout(() => {
						try {
							let x = onRejected(this.reason);
							resolvePromise(x, promise2, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
			}
		});
		return promise2;
	}
	catch(errFN) {
		return this.then(null, errFN)
	}
	finally(callback) {
		return this.then((val) => {
			return Promise.resolve(callback()).then(() => val)
		}, (err) => {
			return Promise.resolve(callback()).then(() => { throw err })
		})
	}
	static all(promises) {
		return new Promise((resolve, reject) => {
			let arr = [], i = 0; //resolve 数组
			function processData(i, data) {
				arr[i] = data
				if (++i == promises.length) {
					resolve(arr)
				}
			}
			for (let i = 0; i < promises.length; i++) {
				let current = promises[i]
				if (isPromise(current)) {
					current.then((value) => {
						processData(i, value)
					}, reject)
				} else {
					processData(i, current)
				}
			}
		})
	}
	static race(promises) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				let current = promises[i]
				if (isPromise(current)) {
					current.then(resolve, reject)
				} else {
					resolve(current)
				}
			}
		})
	}
	static resolve(val) {
		return new Promise((resolve, reject) => {
			resolve(val)
		})
	}
	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}
}
function isPromise(checkobj) {
	if ((typeof checkobj == 'object' && checkobj != null) || typeof checkobj == 'function') {
		return typeof checkobj.then == 'function'
	}
	return false
}
Promise.defer = Promise.deferred = function () {
	let dfd = {};
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve;
		dfd.reject = reject;
	});
	return dfd;
};
module.exports = Promise;
