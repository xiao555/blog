import compose from 'koa-compose'
import Router from 'koa-router'
import importDir from 'import-dir'
import generateRouter from './router'
import generateAction from './actions'
import Admin from './admin'

const prefix = '/api'
const models = importDir('../models')


export default () => {
  const router = new Router({ prefix })
  Object.keys(models).forEach(key => generateRouter(key, router, Admin.permission, generateAction(models[key])));
  router
    .post('/admin/login', Admin.login)
    .post('/admin/register', Admin.register)
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
