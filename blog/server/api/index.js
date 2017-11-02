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
    .post('/view/articles', async ctx => {
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
