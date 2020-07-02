//函数柯里化，函数反柯里化

//判断变量类型有四种方法
// 1. typeof 判断null为object 不能判断对象类型
// 2. constructor 可以找到是谁构造出来了
// 3. instanceof 判断谁是谁的实例 __proto__
// 4. Object.prototype.tostring.call() 不能知道谁是谁的实例

function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
isType("Array", []);
//能不能将函数再细分，isType 变成 isString 返回true和false呢

/******************************* */
function typeFactory(type) {
  return (value) => {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  };
}
// let isArray = typeFactory("Array");
// console.log(isArray([]));
let isString = typeFactory("String");
// console.log(isString("1"));

/******************************* */
//创建通用的方法
const utils = {};
const types = ["String", "Boolean", "Number"];
types.forEach((type) => {
  utils[`is${type}`] = typeFactory(type);
});
// console.log(utils.isNumber(1));

/**************利用柯里化 */
function sum(a, b, c, d, e, f) {
  console.log(a + b + c + d + e + f);
  return a + b + c + d + e + f;
}

function curring(fn, arrs = []) {
  let len = fn.length;
  return function (...args) {
    arrs = [...arrs, ...args];
    if (arrs.length < len) {
      return curring(fn, arrs);
    } else {
      return fn(...arrs);
    }
  };
}
curring(sum)(1, 2)(3, 4)(5, 6);
let isArray = curring(isType)("Array");
console.log(isArray([]));

/********反柯里化 */
function isCurrying(type) {
  return (value) => {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  };
}

/***
 * 柯里化和反柯里化
 * 1.柯里化
 * 柯里化，在这个例子中可以看出很明显的行为规范：
    逐步接收参数，并缓存供后期计算使用
    不立即计算，延后执行
    符合计算的条件，将缓存的参数，统一传递给执行方法
    2.反柯里化
    是一个泛型化的过程。它使得被反柯里化的函数，可以接收更多参数。目的是创建一个更普适性的函数，可以被不同的对象使用。有鸠占鹊巢的效果

    闭包
    函数A返回函数B，函数B引用了函数A的变量，函数B称之为闭包
    函数B的定义作用域和函数执行作用域，不在同一个作用域下。
 */
