/**
 * Promise有三个状态:成功态，失败态，等待态。
 * 
 *    1。用户自己决定成功的原因和失败的原因。
 *    2. promise默认执行器立即执行。
 *    3. promise有个then方法，里面有成功回调和失败回调。
 *    4. 如果执行函数发生了异常就回执行失败回调
 *    5. promise一旦成功就不能失败，反过来一样（只有等待态才能更改状态）
      * new Promise((resolve,reject)=>{
        resolve();
        throw new Error()
      })
      
 */

const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
const PENDING = "PENDING";
class Promise {
	constructor(executor) {
		this.status = PENDING;
		this.reason = undefined;
		this.value = undefined;
		console.log('my');
		const resolve = (value) => {
			if (this.status == PENDING) {
				this.value = value;
				this.status = RESOLVED;
			}
		};
		const reject = (reason) => {
			if (this.status == PENDING) {
				this.reason = reason;
				this.status = REJECTED;
			}
		};

		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}
	then(onFulfilled, onRejected) {
		if (this.status == RESOLVED) {
			onFulfilled(this.value);
		}
		if (this.status == REJECTED) {
			onFulfilled(this.reason);
		}
	}
}

module.exports = Promise;
