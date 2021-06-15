相比于 Loader，Plugin 拥有更宽的能力范围，可以触及到 Webpack 构建的每一个环节。

插件实现机制：钩子机制，通过给每一个环节挂在任务，添加 webpack 的能力。

要求：
插件是一个函数或者是包含 apply 方法的 JavaScript 对象。一般把插件定义为一个类型，定义一个 apply 方法，使用的时候创建该类型的实例进行使用


```js
// 移除打包后的多余注释插件
class myPlugin {
  apply (compiler) {
    console.log('myPlugin 启动自动调用 apply');

    // 挂在 emit 节点
    compiler.hooks.emit.tap('myPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          // 获取文件内容
          const conents = compilation.assets[name].source()
          // 处理后的内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '');
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    })
  }
}
```
