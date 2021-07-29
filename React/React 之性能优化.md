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

#### 针对函数组件的 React.memo 和 useMemo
