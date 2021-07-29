1. shouldComponentUpdate 规避冗余的更新逻辑
2. PureComponent + immutable.js
3. React.memo 和 useMemo

#### 合理使用 shouldComponentUpdate

`shouldComponentUpdate` 是 React 类组件的一个生命周期。其调用形式如下：
```js
shouldComponentUpdate(nextProps, nextState)
```
**React 组件会根据 shouldComponentUpdate 返回布尔值决定是否执行该方法之后的生命周期，进而决定是否对组件进行 re-render**。 由于 render 方法会伴随着对虚拟 DOM 的构建和比对，整个过程相当耗时。而我们再使用 React 的过程中不经意间就会频繁触发 render 函数。为了避免不必要的频繁调用造成性能开销，要利用这个方法加以控制

示例：
```js
ChildA.js
import React from 'react';
export default class ChildA extends React.Component {
  render() {
    console.log('child a render');
    return () {
      <div className="childA">
        组件A
        {this.props.text}
      </div>
    }
  }
}

ChildB.js
import React from 'react';
export default class ChildB extends React.Component {
  render() {
    console.log('child b render');
    return () {
      <div className="childB">
        组件B
        {this.props.text}
      </div>
    }
  }
}
```

#### 进阶玩法 PureComponent + immutable.js

`shouldComponentUpdate` 虽然一定程度上帮我们解决了性能方面的问题，然是每个组件要控制避免多次渲染，都要写一遍 `shouldComponentUpdate` 很是繁琐。React 15.3 新增了一个 `PureComponent` 的类，切到好处地解决了重复写 `shouldComponentUpdate` 的问题。

`PureComponent` 和 `Component` 的区别就是，`PureComponent` 内置了对 `shouldComponentUpdate` 的实现：`PureComponent` 将会在 `shouldComponentUpdate` 中对组件更新前后的 props 和 state 进行浅比较，并根据比较结果决定是否继续后面的更新流程。

**浅比较：**将针对值类型数据对比其值是否相等，而针对数组、对象等引用类型的数据则对比其引用是否相等

#### 针对函数组件的 React.memo 和 useMemo

函数组件中类似 `shouldComponentUpdate` 的方式就是 React.memo。

React.memo 是 React 导出的一个顶层函数，它本质上是一个高阶组件，负责对函数组件进行包装。基本调用示例如下：

```js
import React from 'react';

function FunctionDemo(props) {
  return (
    // ...
  )
}

// areEqual 函数是 memo 的第二个入参，我们之前在 `shouldComponentUpdate` 中的逻辑就可以在这个方法中编写
function areEqual(prevProps, nextProps) {

}

export default React.memo(FunctionDemo, arEqual);
```

**`areEqual` 是一个可选参数，当我们不传入 `` 时，React.memo 也可以工作，此时他的作用类似于 PureComponent 进行 props 的浅比较逻辑**
