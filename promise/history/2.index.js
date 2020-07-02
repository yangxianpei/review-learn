let PromiseA = require("./2.promise");
let promise = new PromiseA((resolve, reject) => {
  setTimeout(() => {
    resolve(200);
  },3000);
});
promise.then(
  (d) => {
    console.log("success", d);
  },
  (e) => {
    console.log("fail", e);
  }
);
