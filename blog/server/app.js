'use strict';
import Koa from 'koa'
import log from './utils/log'
import middleware from './middleware'
import { connectDatabase } from './db/mongodb'
import api from './api'
import config from './config'
const port = config.port
const app = new Koa()

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} ${ctx.status} - ${ms}ms`);
});
app.use(middleware())
app.use(api())
app.use(ctx => ctx.status = 404)

;(async () => {
  try {
    const db = await connectDatabase(config.mongoDB)
    log.info(`Connected to ${db.host}:${db.port}/${db.name}`)
    await app.listen(port, () => log.info(`Server started on port ${port}`))
  } catch(e) {
    log.error(e);
  }
})()

export default app