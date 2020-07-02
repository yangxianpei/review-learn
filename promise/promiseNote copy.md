/**
 * Promise有三个状态:成功态，失败态，等待态。
 * 
 *    1。用户自己决定成功的原因和失败的原因。
 *    2. promise默认执行器立即执行。
 *    3. promise有个then方法，里面有成功回调和失败回调。
 *    4. 如果执行函数发生了异常就回执行失败回调
 *    5. 如果执行了resolve 下面的throw抛出的错误不会执行
      * new Promise((resolve,reject)=>{
        resolve();
        throw new Error()
      })
 */

