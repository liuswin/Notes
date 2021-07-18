### this

> this 指向谁，并不取决于 this 写在哪里。而是 this 所在的函数如何被调用

```js
function foo() {
  console.log(this);
}

foo() // => 全局对象
foo.call(1) // => 1
```

```js
const obj1 = {
  foo: function() {
    console.log(this)
  }
}

obj1.foo() // => obj1
const fn = obj1.foo;
fn() // => 全局对象
```

```js
const obj2 = {
  foo: function() {
    function bar() {
      console.log(this)
    }
    bar()
  }
}

obj2.foo() // => 全局对象
```

总结：

1. 沿着作用域向上找最近的一个 `function` 关键字修饰的函数 （不是箭头函数），看这个 `function` 最终是怎样执行的；
2. this 的指向取决于所属 `function` 的调用方式，而不是定义；
3. `function` 调用一般分为以下几种情况
   1. 作为函数调用。例：`foo()`
     - 指向全局对象（globalThis），注意严格模式问题，严格模式下是 `undefined`
   2. 作为方法调用。例：`foo.bar()`
     - 指向最终抵用这个方法的对象
   3. 作为构造函数调用。例：`new Foo()`
     - 指向对应的实例化对象
   4. 特殊调用。例：`foo.call()` / `foo.apply()` / `foo.bind()`
     - 指向指定的参数
4. 找不到所属的 `function` 指向就是全局对象
