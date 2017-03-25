'use strict';
import Koa from 'koa'
import log from './utils/log'
import middleware from './middleware'
import { connectDatabase } from './db/mongodb'
import api from './api'
const dbUri = 'mongodb://localhost/blog'
const port = process.env.PORT || 3025
const app = new Koa()

const router = api()


// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.body = { message: err.message }
//     ctx.status = err.status || 500
//   }
// })

// app.use(async ctx => {
//   ctx.body = 'Hello World!'
// })


// app.use(ctx => ctx.status = 404)
app.keys = ['secret'];

app.use(middleware())
app.use(api())
// app.use(ctx => router.routes())
// app.use(ctx => router.allowedMethods());
app.use(ctx => ctx.status = 404);

;(async () => {
  try {
    
    const db = await connectDatabase(dbUri)
    log.info(`Connected to ${db.host}:${db.port}/${db.name}`)
  } catch(e) {
    // statements
    log.error(e);
  }

  try {
    // await app.use(middleware())
    // await app.use(api())
    // await app.use(ctx => ctx.status = 404);
    // await app.use(router.routes())
    // await app.use(router.allowedMethods());
    await app.listen(port, () => log.info(`Server started on port ${port}`))
  } catch(e) {
    // statements
    log.error(e);
  }
})()

export default app