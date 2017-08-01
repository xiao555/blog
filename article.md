# 基于Vue2 +  Koa2搭建前后端分离的博客系统

先上博客地址：[https://www.xiao555.com.cn/](https://www.xiao555.com.cn/)

Github： [https://github.com/xiao555/blog](https://github.com/xiao555/blog)

很多人都想有一个自己的博客，很多人也都有自己的博客，现在网上也有很多流行的静态博客生成器，比如 Hexo啦，Jekyll啦，我的第一个博客也是用Hexo生成的，部署在Github Pages，还有VPS上。 但是又不满足于此，想要打造一个包含后端和数据库的完整的博客系统，而且可以让我从前端接触到后端，接触到服务器运维，数据库操作等方方面面，于是这个项目就诞生啦。

这个是我准备找实习练手vue的项目，不过大部分都是在通过腾讯实习后完成的。断断续续开发了这么长时间，也希望写一篇文章记录一下心得和体会。

本文将按照开发顺序，从后端到前端，从部署到优化，讲述一下这个博客系统的出生到落地。

## 后端篇

既然是前后端分离，那么后端的基本功能我们也就大体清楚：提供API接口供前端进行数据的增删改查。

那为什么要选择Koa作为后端框架呢？ 因为作为前端er的我首选就是Node.js的，express 之前用过了， 这次要体验一个不一样的，所有就选择Koa2，而且Koa 也是express 原班人马打造的第二代框架:

> koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

实现过程中也会发现，Koa 确实如官网所说的简洁优雅，写起来得心应手，而Koa最有意思的当属他的中间件机制吧，就像这个洋葱图, 一层层进去，又一层层出来：

![img](https://xiao555.netlify.com/onion.png)

如果你愿意一层一层一层的进入我的心，我就把你一层一层一层地请出去~~ [相关文档](https://eggjs.org/zh-cn/intro/egg-and-koa.html#middleware)，这里就不多说了。

有了后端框架，我们还需要一个数据库保存我们的数据，这里我选择了MongoDB，简单方便，没有关系型数据库那么多道道，而且数据存储格式是BOSN(Binary JSON)，我们可以当做JSON来操作。

打算用ES6来开发，所以配置了Babel：

```js
// entry.js
require("babel-register")({
  presets: [
    "es2015",
    "stage-0"
  ],
  plugins: ["transform-runtime"]
});
require("babel-polyfill")

require('./app')
```
由入口文件进入了app.js

```js
'use strict';
import Koa from 'koa'
import log from './utils/log'
import middleware from './middleware'
import { connectDatabase } from './db/mongodb'
import api from './api'
import config from './config'
const port = config.port
const app = new Koa()

app.use(async (ctx, next) => { // 洋葱的外皮，利用中间件机制巧妙的计算 每次请求的响应时间
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} ${ctx.status} - ${ms}ms`);
});
app.use(middleware()) // 加载中间件
app.use(api())  // Koa-router 配置的路由
app.use(ctx => ctx.status = 404) // 默认返回 404

;(async () => { // 还可以愉快的用async await实现异步
  try {
    const db = await connectDatabase(config.mongoDB) // 连接数据库
    log.info(`Connected to ${db.host}:${db.port}/${db.name}`)
    await app.listen(port, () => log.info(`Server started on port ${port}`)) // 开启服务，监听端口
  } catch(e) {
    log.error(e);
  }
})()

export default app
```
感觉Koa写起来十分简洁优雅哈哈，不过是大部分逻辑都抽离出来放在其他文件里了，这里面主要是Log，Middleware, DB, Router, 我们一个一个来解刨。

### Log

这里选择的是 [log4js](https://github.com/nomiddlename/log4js-node) 作为日志管理以及debug工具, 实现起来十分方便：

```js
import log4js from 'log4js'
import path from 'path'
const env = process.env.NODE_ENV
if(env == 'production') { // 生产环境下日志输出到文件中
  log4js.configure({
    appenders: [
      { type: 'file', filename: path.join(__dirname,'..', 'log/cheese.log')}
    ]
  });
}

let log = log4js.getLogger('TYPE')
export default log4js.getLogger('Blog')
// 下面这一串是打印输出格式的例子
log.debug("LOG TYPE:")
log.debug('DEBUG')
log.info('INFO')
log.warn('WARN')
log.error('ERROR')
log.fatal('FATAL')
```
效果如下：

![log4js](https://xiao555.netlify.com/blogapi.jpg)

### Middleware

```javascript
// middleware/index.js
import compose from 'koa-compose';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
const RedisStore = require('koa-redis');

export default function middleware() {
  return compose([
    helmet(), // reset HTTP headers (e.g. remove x-powered-by)
    convert(cors()),
    convert(bodyParser()),
    convert(session({
      store: new RedisStore()
    })),
  ]);
}
```
