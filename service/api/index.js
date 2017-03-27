import compose from 'koa-compose'
import Router from 'koa-router'
import importDir from 'import-dir'
import generateRouter from './router'
import generateAction from './actions'

const prefix = '/api'
const models = importDir('../models')


export default () => {
  const router = new Router({ prefix })
  Object.keys(models).forEach(key => generateRouter(key, router, generateAction(models[key])));
  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
