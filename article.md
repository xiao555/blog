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
    helmet(), // 提供安全的header
    convert(cors()), // 配置 Access-Control-Allow-Origin CORS header.
    convert(bodyParser()), // 解析 body，存储在 ctx.request.body 里
    convert(session({ // sessio
      store: new RedisStore()
    })),
  ]);
}
```

### DataBase

数据库的连接：

```javascript
import mongoose from 'mongoose'
import log from '../utils/log'
mongoose.Promise = global.Promise; // 内置的promise已经弃用了，需要用自己的promise库，这里选择用原生的ES6 Promise

export function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => log.warn('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(uri)
  })
}
```
Models的创建(以Category为例)：

```javascript
import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
  name: String,
  number: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false
})

export default mongoose.model('category', categorySchema)
```

### Router

```javascript
import compose from 'koa-compose'
import Router from 'koa-router'
import importDir from 'import-dir'
import generateRouter from './router'
import generateAction from './actions'
import Admin from './admin'
import Article from '../models/article.js'
import log from '../utils/log'

const prefix = '/api'
const models = importDir('../models')

export default () => {
  const router = new Router({ prefix })
  Object.keys(models).forEach(key => generateRouter(key, router, Admin.permission, generateAction(models[key])));
  router
    .post('/admin/login', Admin.login)
    .post('/view/blog', async ctx => {
      try {
        const blog = await Article.find(ctx.request.query)
        const result = await Article.findByIdAndUpdate(blog[0].id, {visits: ++blog[0].visits}, {new: true})
        if (result) return ctx.status = 200
      } catch (e) {
        log.error(e)
      }
    })
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}

```

```javascript
// generateRouter
export default (model, router, permission, actions) => {
  router
    .get('/'+ model + 's', actions.find)
    .post('/'+ model + 's', permission, actions.create)
    .get('/'+ model + 's/:id', actions.findById)
    .put('/'+ model + 's/:id', permission, actions.updateById)
    .delete('/'+ model + 's/:id', permission, actions.deleteById)
}
```

最初的models是有四个，article，category，tag，user。所以通过importDir获取Models的集合，文件名就是key，通过generateRouter给每个model加上增删改查的路由，并对应generateAction里的不同的action，对于个别的请求需要加上权限验证。除此之外增加了两个路由，登录后台的`/admin/login`和统计文章浏览数的`/view/blog`。

之所以把user去掉了，是因为想了下这个blog就自己在用，不会有好几个用户的情况，所以直接把用户名密码保存在config里了。除了用户名密码，config里还有mongoDB的地址，redis的地址，服务器运行端口，鉴权秘钥，token过期时间这些配置。


### Auth

再来说说权限验证，这里我用的是redis + JWT 的方式。用户在登录成功的时候，后台会生成一个token，用redis保存1h。并且这个token会返回给浏览器端，浏览器端保存在localStorage里，并且当localStorage存在token时，每次请求都会作为header的一个字段带上它，供后端验证。

```javascript
// api/admin.js  permission
const token = ctx.request.headers['authorization'] || null
if (!token) return ctx.body = {
  status: 'fail',
  message: 'Token not found'
}
const result = Token.verifyToken(token)

if (!result) return ctx.body = {
  status: 'fail',
  message: 'Token verify failed'
}

const reply = await redis.getAsync(token)

if (!reply) return ctx.body = {
  status: 'fail',
  message: 'Token invalid'
}

return next()
```

### Test

在写完api路由的时候用Mocha + Chai做了一下单元测试，用模拟数据测试增删改查功能，下面例子是上传文章的api测试：

```javascript
// test/api/routes/articles.js
it('should create article', async () => {
  const res = await request.post('/api/articles')
    .send(article)
    .expect(200)
    .expect('Content-Type', /json/)

  Object.keys(res.body).should.have.length(11);
  res.body.should.have.property('_id');
  res.body.title.should.equal(article.title);
  res.body.content.should.equal(article.content);
  res.body.status.should.equal(true);
});
```
### 总结

作为一个前后端分离的blog的后端，做好增啥改查，权限验证就好，实现起来并不难，比较复杂的地方就是对api每个请求的处理了（api/actions.js），


## 前端篇
