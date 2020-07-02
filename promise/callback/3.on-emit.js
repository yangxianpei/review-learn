/***
 * 发布订阅模式
 * on 订阅 emit 发布 他两并没有依赖关系
 */
let fs = require("fs");
let path = require('path')
class Event {
  constructor() {
    this.arr = [];
  }
  on(fn) {
    this.arr.push(fn);
  }
  emit() {
    this.arr.forEach((fn) => fn());
  }
}
let obj = {};
let event = new Event();

event.on(function () {
  console.log("读取成功");
});
event.on(function () {
  if (Object.keys(obj).length == 2) {
    console.log("读取完毕");
  }
});
fs.readFile(path.join(__dirname,"./a.txt"), "utf8", (err, data) => {
  console.log(data);
  obj.name = data;
  event.emit();
});
fs.readFile(path.join(__dirname, "./b.txt"), "utf8", (err, data) => {
  console.log(data);
  obj.age = data;
  event.emit();
});
