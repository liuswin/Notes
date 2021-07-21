### [new 运算符原理](../JavaScript/JavaScript深入系列/new的模拟实现.md)

### [this 指向问题](../JavaScript/JavaScript深入系列/this指向.md)

### JS 实现继承的方式

```js
// 定义一个父类
function Father(name) {
  // 属性
  this.name = name || 'father';
  // 实例方法
  this.sayName = function () {
    console.log(this.name);
  };
  this.color = ['red', 'blue'];
}

// 原型方法
Father.prototype.age = 18;
Father.prototype.sayAge = function () {
  console.log(this.age);
};
```

- 原型链继承：将父类的实例作为子类的原型

> Tip：
> 优点：
> 1. 简单，易于实现
> 2. 父类新增原型方法、原型属性，子类都能访问到
>
> 缺点：
> 1. 无法实现多继承，因为原型一次只能被一个实例更改
> 2. 来自原型对象的所有属性被所有实例共享（上述例子中的 color 属性）
> 3. 创建子类实例时，无法向父构造函数传参

```js
function Son(name) {
  this.name = name || 'son';
}

Son.prototype = new Father();

let s1 = new Son('s1');
let s2 = new Son('s2');

s1.color.push('black');
console.log(s1.name); //s1
console.log(s1.color); //['red','blue','black']
console.log(s1.age); //18
s1.sayAge(); //18
console.log(s2.name); //s2
console.log(s2.color); //['red','blue','black']
```

- 构造函数继承：复制父类的实例属性给子类

> Tip：
> 优点：
> 1. 解决了原型链继承中子类实例共享父类引用属性的问题
> 2. 创建子类实例时，可以向父类传递参数
> 3. 可以实现多继承（call 多个父类对象）
>
> 缺点：
> 1. 实例并不是父类的实例，只是子类的实例
> 2. 只能继承父类实例的属性和方法，不能继承其原型上的属性和方法
> 3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

```js
function Son(name) {
  Father.call(this, '传给父类的参数');
  this.name = name || 'son';
}
let s = new Son('son');
console.log(s.name); // son
//s.sayAge(); // 抛出错误（无法继承父类原型方法）
s.sayName(); // son
console.log(s.age); // undefined（无法继承父类原型属性）
console.log(s instanceof Father); // false
console.log(s instanceof Son); // true
```

- 组合继承：将原型链继承和构造函数继承结合到一块，使用原型链实现对原型属性和方法的继承，而通过构造函数来实现对实例属性的继承

> Tip：
> 优点：
> 1. 弥补了构造函数的缺点，现在既可以继承实例的属性和方法，也可以继承原型的属性和方法
> 2. 既是子类的实例，也是父类的实例
> 3. 可以向父类传递参数
> 4. 函数可以复用
>
> 缺点：
> 1. 调用了两次父类构造函数，生成了两份实例
> 2. constructor 指向问题

```js
function Son(name) {
  Father.call(this, '传给父类的参数');
  this.name = name || 'son';
}

Son.prototype = new Father();

let s = new Son('son');
console.log(s.name); // son
s.sayAge(); // 18
s.sayName(); // son
console.log(s.age); // 18
console.log(s instanceof Father); // true
console.log(s instanceof Son); // true
console.log(s.constructor === Father); // true
console.log(s.constructor === Son); // false
```

- 寄生组合继承：通过寄生方式，砍掉父类的实例属性，避免了组合继承生成两份实例的缺点

```js
function Son(name) {
  Father.call(this);
  this.name = name || 'son';
}
```
