/**
 * 异步promise
      
 */
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
const PENDING = "PENDING";
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.reason = undefined;
    this.value = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    const resolve = (value) => {
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
    if (this.status == RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status == REJECTED) {
      onFulfilled(this.reason);
    }
    if (this.status == PENDING) {
      this.onFulfilledCallback.push(() => {
        //todo
        onFulfilled(this.value);
      });
      this.onRejectedCallback.push(() => {
        //todo
        onRejected(this.value);
      });
    }
  }
}

module.exports = Promise;
