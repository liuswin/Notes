### call

作用：

> call() 方法在使用一个指定的 this 和若干个指定的参数值的前提下调用某个函数或方法

call 函数作用梳理

- 方法或函数中的 this 指向第一个参数，this 指向：方法或函数指向调用者
- 指定的对象可能没有对应的方法，调用需要给对象添加属性并指向对应的方法
- 处理完成后需要删除添加的属性

```js
function fn(a, b, c) {
  return a + b + c;
}

const obj = {
  name: 'zhoumo',
};

// 第一步给所有函数增加自定义 call 函数
Function.prototype.mycall = function (context, ...args) {
  // 处理 context 可能为空
  context = context || window;
  // 指定上下文对象添加 fn 属性 记录调用的方法
  // context.fn = this; // log可以输出给对象添加的额外属性
  Object.defineProperty(context, 'fn', {
    value: this,
    enumerable: false,
    configurable: true,
  });
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

fn.mycall(obj, 1, 3, 2);
```
