> JavaScript 是单线程，单线程指在 JavaScript 引擎中负责解释和执行代码的线程唯一，同一时间上只能执行一个任务。

#### JavaScript 单线程的原因

作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的线程同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？


### 异步编程方案

* 回调函数
* Promise
* Generator
* async/await

#### 回调函数

JavaScript中所有的异步方案的根基
