loader 是 webpack 的核心机制

每个 webpack 的 loader 都需要导出一个函数，输入就是加载到资源文件内容，输出是加工后的结果。

- 输出的结果应该是 webpack 期望的可运行的 JavaScript 代码

自定义一个 markdown 加载 Loader

source => Result (JavaScript 代码)

返回的 Result 处理成 JavaScript 代码有两种方式：

- loader 内部自己处理

```js
module.exports = (source) => {
  // source 加载到的 markdown 资源
  let html = '加工后的结果';
  // return `module.export = ${html}`; // 可运行的 JavaScript 代码
  return `export default ${JSON.stringify(html)}`; // esm 模式
};
```

- 交由额外的 loader 处理成 javascript 代码

使用 `html-loader`, 配置需要添加多个 loader

```js
{
  test: /.md$/,
  use: ['html-loader', '自定义loader'];
}
```

webpack 配置使用自己的 loader

```js
{
  // ...
  module: {
    rules: [
      // ...
      {
        test: /.md$/, // 假设匹配 markdown 文件
        use: 'loader-name/loader-path', // use 相当于 node 中的 require 所以支持使用 Loader 的方式：1、安装的loader名称 2、本地的路径
      },
    ];
  }
  // ...
}
```
