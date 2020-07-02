/**
 * 观察者模式 是基于发布订阅模式，观察者需要被放进被观察者中，被观察者的状态发现变化了通知观察者.
 */
class Child {
  //被观察者
  constructor() {
    this.name = "孩子";
    this.state = "happying";
    this.observers = [];
  }
  attach(o) {
    this.observers.push(o);
  }
  setState(newState) {
    this.state = "newState";
    this.observers.forEach((observer) => observer.update(this));
  }
}

class Parent {
  //观察者
  constructor(name) {
    this.name = name;
  }
  update(baby){
    console.log(baby.name+'当前'+this.name+'被通知了');
  }
}
let mother = new Parent("mother");
let father = new Parent("father");
let child = new Child();
child.attach(mother);
child.attach(father);
child.setState('crying')
