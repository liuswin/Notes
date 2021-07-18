### new

一句话介绍 new:

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

new 实现了那些功能

1. 创建一个空对象
2. 连接到原型（每个对象会有一个属性指向构造函数的原型，例：__proto__，IE 没有该属性）
3. 绑定this
4. 返回生成的新对象，（如果构造函数中没有返回其他对象，那么返回 this，即创建的这个的新对象，否则返回构造函数中返回的对象）

例子：
```js
// Otaku 御宅族
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

### 初步实现

```js
function objectFactory() {
  var obj = new Object();
  // 取出传入的构造函数
  Constructor = [].shift.call(arguments);

  // 原型链关联
  object.__proto__ = Constructor.prototype;
  // 使用 apply 更改 Constructor 的 this 指向，指向 新生成的 obj
  Constructor.apply(obj, arguments);

  return obj;
}
```

### 兼容返回值实现

```js
function objectFactory() {
  var obj = new Object();
  // 取出传入的构造函数
  Constructor = [].shift.call(arguments);

  // 原型链关联
  object.__proto__ = Constructor.prototype;
  // 使用 apply 更改 Constructor 的 this 指向，指向 新生成的 obj
  var ret = Constructor.apply(obj, arguments);

  // 兼容返回 null 返回结果
  return typeof ret === 'object' ? ret || obj : obj;
}
```
