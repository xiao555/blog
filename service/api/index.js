import compose from 'koa-compose'
import Router from 'koa-router'
import importDir from 'import-dir'
import generateRouter from './router'
import generateAction from './actions'
import User from '../models/user'

const prefix = '/api'
const models = importDir('../models')


export default () => {
  const router = new Router({ prefix })
  Object.keys(models).forEach(key => generateRouter(key, router, generateAction(models[key])));
  router
    .post('/admin/login', generateAction(User).login)
    .post('/admin/register', generateAction(User).register)
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
