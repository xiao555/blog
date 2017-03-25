import compose from 'koa-compose'
import Router from 'koa-router'
import convert from 'koa-convert';
import importDir from 'import-dir'

const routes = importDir('./routes')

export default function api() {
  const router = new Router()
  Object.keys(routes).forEach(name => routes[name](router));

  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}