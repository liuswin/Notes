### BFC

> BFC (Block Formating Context) 块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

BFC 形成条件：

- 浮动元素，float 除 none 以外的值
- 定位元素，position（absolute、fixed）
- display 为以下其中之一的值 inline-block，table-cell，table-caption;
- overflow 除了 visible 意外的值（hidden，auto，scroll）

BFC 特性：

- 内部的 Box 会在垂直方向上一个接一个的放置
- 垂直方向上的距离由 margin 决定；（解决外边距重叠问题）
- bfc 的区域不会与 float 的元素区域重叠；（防止浮动文字环绕）
- 计算 bfc 的高度时，浮动元素也会参与运算；（清除浮动）
- bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素；
