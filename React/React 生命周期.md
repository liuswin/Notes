### React 生命周期

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

* getDerivedStateFromProps

该函数的作用是 props 变化时更新 state，触发时机有哪些

  - 当 props 被传入时
  - state 发生变化时
  - forceUpdate 被调用时

> Tip: 最常见的错误就是认为只有在 props 发生变化时，getDerivedStateFromProps 才会被调用，而实际上只要父级组建重新渲染时，getDerivedStateFromProps 就会被调用。所以是 props 传入时就会被调用

* UNSAFE_componentWillMount
* render
* componentDidMount

#### 更新阶段

* UNSAFE_componentWillReceiveProps
* getDerivedStateFromProps
* shouldComponentUpdate
* UNSAFE_componentWillUpdate
* render
* getSnapshotBeforeUpdate
* componentDidUpdate

#### 卸载阶段

* componentWillUnMount
