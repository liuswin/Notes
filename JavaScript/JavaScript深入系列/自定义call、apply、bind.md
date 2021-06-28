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

### apply

> apply() 方法能够编写用于不同对象的方法，

#### 与 call 的不同点
- 与 call 方法的区别是接收参数的形式。call 是分别接收参数，apply 是接收一个参数数组

```js
Function.prototype.myapply = (context, arr) {
  let result = undefined;
  context = Object(context) || window;

  Object.defineProperty(context, 'fn', {
    value: this,
    enumerable: false,
    configurable: true
  });

  if (!arr.length) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i ++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return result;
}
```

### bind

介绍：
> `bind()` 方法会创建一个新函数，在 `bind()` 被调用时，这个新函数的 this 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用 （[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)）

* 返回一个新的函数
* 函数的调用上下文 this 为 bind 的第一个参数，可以使用 call、apply 改变this

```js
Function.prototype.mybind = (context, ...args) {
  return function() {
    return
  }
}
```
