### React 生命周期

![React 16.4](https://user-images.githubusercontent.com/15181620/129828195-5bf183a0-771e-4d9b-aba3-c62e706f3360.png)

当我们讨论生命周期的时候，一定是在讨论类组件。函数式组件没有生命周期，hook使用是模拟对应的回调函数。

生命周期是一个组件从： 挂载 -> 更新 -> 卸载 这个完整的流程。而我们所说的回调函数 `componentDidMount`、`componentWillUnmount` 等等，只是再生命周期中会被按顺序调用的函数。

#### 挂载阶段

* constructor

constructor 是类通用的构造函数，常用于初始化。所以在过去，constructor 通常用于初始化 state 于绑定函数。

```js
import React from 'react'
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
     // do some stuff
  }
  render() {
     return null
  }
}
```

当类属性开始流行之后，就去除了 constructor

```js
import React from 'react'
class Counter extends React.Component {
  state =  {
    count: 0
  }
  handleClick = () => {
     // do some stuff
  }
  render() {
     return null
  }
}
```

社区中去除 constructor 的原因非常明确：

* constructor 中并不推荐去处理初始化意外的逻辑
* 本身 constructor 并不属于 React 的生命周期，他只是 Class 的初始化函数
* 通过移除 constructor，代码也会变得整洁

* getDerivedStateFromProps

该函数的作用是 props 变化时更新 state，触发时机有哪些

  1. 当 props 被传入时
  2. state 发生变化时
  3. forceUpdate 被调用时

> Tip: 最常见的错误就是认为只有在 props 发生变化时，getDerivedStateFromProps 才会被调用，而实际上只要父级组建重新渲染时，getDerivedStateFromProps 就会被调用。所以是 props 传入时就会被调用

官方文档例子：
```js
class ExampleComponent extends React.Component {
  // 在构造函数中初始化 state，或者使用属性初始化器
  state = {
    isScrollingDown: false,
    lastRow: null
  };
  static getDerivedStateFromProps(props, state) {
    if (props.currentRow !== state.lastRow) {
      return {
        isScrollingDown: props.currentRow > state.lastRow,
        lastRow: props.currentRow
      };
      // 返回 null 表示不需要更新 state。
      return null;
    }
  }
}
```
依据官方的说法，它的使用场景是很有限的。由于太多错误使用的案例，React 官方团队甚至写了一篇你可能不需要使用派生 state。文中主要列举了两种反模式的使用方式：

直接复制 prop 到 state；

在 props 变化后修改 state。

这两种写法除了增加代码的维护成本外，没有带来任何好处。

* UNSAFE_componentWillMount

也就是 componentWillMount，本来用于组件即将加载前做某些操作，但目前被标记为启用。因为在 React 的异步渲染机制下，该方法可能会被多次调用。

一个常见的错误是 componentWillMount 跟服务器同构渲染的时候，如果在该函数里发起网络请求，拉取数据，那么会在服务器端与客户端分别执行一次。所以更推荐在 componentDidMount 中完成数据拉取操作。

**一个良好的设计应该是不让用户有较高的理解成本**，而该函数却与之相悖。所以被标记弃用

* render

  render 函数返回的 JSX 结构，用于描述具体的渲染内容，render 函数并没有真正的去渲染组件，渲染是通过 React 操作 JSX 描述结构来完成的，render 函数应该是一个纯函数，不应该产生副作用，比如 setState 或者绑定事件。

  render 函数在每次渲染的时候会被调用，组件状态更改会触发渲染，就会造成死循环。

  为什么不能绑定事件？因为容易被频繁调用注册

* componentDidMount

  主要用于组件加载完成时做某些事情，比如绑定事件、发起网络请求

#### 更新阶段

* UNSAFE_componentWillReceiveProps

该函数已弃用，因为其功能可被函数 getDerivedStateFormProps 所代替。当 getDerivedStateFormProps 存在时，UNSAFE_componentWillReceiveProps 不会被调用。

* getDerivedStateFromProps（React 17新增生命周期函数）

* shouldComponentUpdate



* UNSAFE_componentWillUpdate
* render
* getSnapshotBeforeUpdate（React 17新增生命周期函数）
* componentDidUpdate

#### 卸载阶段

* componentWillUnMount

  该函数主要用于执行清理工作，比如组件内部的定时器。如果不清理会导致定时器一直执行，占用内存。

![react生命周期](https://github.com/liuswin/notes/blob/master/React/assets/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

### React 16 为什么要更改组件生命周期

![React 16.4](https://user-images.githubusercontent.com/15181620/129828195-5bf183a0-771e-4d9b-aba3-c62e706f3360.png)

经过上面的分析得知了如下这些被废弃的生命周期函数：

* UNSAFE_componentWillMount
* UNSAFE_componentWillReceiveProps
* UNSAFE_componentWillUpdate

为什么会更改
