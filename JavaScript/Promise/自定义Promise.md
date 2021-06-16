#### 梳理 Promise 要点

* Promise 是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
* Promise 有三种状态，分别为：成功（fulfilled）、失败（rejected）、等待（pending）
  * 状态更改 pending -> fulfilled、pending -> rejected 一旦状态更改就不可以更改
* resolve 和 reject 函数是用来更改状态的
  * reslove: 更改状态为 fulfilled
  * reject: 更改状态为 rejected
* Promise 中的 then 方法内部做的事情就是判断状态，然后调用对应回调函数。状态是成功，调用成功回调函数；状态是失败，调用失败回调函数。
* then 是 Promise 实例调用的，then 方法定义在原型对象中的
* then 成功回调函数有一个参数，表示成功的值，resolve 函数传入成功的值；then 失败后的回调有一个参数 表示失败后的原因。reject 喊出传入失败的原因。

```js
new Promise((resolve, reject) => {

})

(resolve, reject) => {} // 相当于执行器
```

#### 自定义 Promise 实现

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {

  status = PENDING;
  // 成功的值
  value = undefined;
  // 失败的原因
  reason = undefined;

  constructor (executor) {
    executor(this.resolve, this.reject);
  }

  // 定义成箭头函数 我们在外部调用 函数内部的 this 指向 promise 实例
  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
  }

  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
  }

  then (successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}
```
