let PromiseA = require('./1.promise')
let promise = new PromiseA((resolve, reject) => {
  resolve(200)
  throw new Error('aaa')
});

promise.then(
  (d) => {
    console.log('success',d);
  },
  (e) => {
    console.log('fail',e);
  }
);
