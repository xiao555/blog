import Token from '../auth'
import log from '../utils/log'
import config from '../config'
import redis from '../db/redis'
const admin = config.admin

export default {
  login: async ctx => {
    try {
      let error = "";
      if (ctx.request.body.name === admin.name) {
        if (ctx.request.body.password === admin.passwd) {
          const token = Token.createToken({ data: admin.name })
          redis.set(token, admin.name)
          redis.expire(token, Math.floor(Date.now() / 1000) + config.expiresIn)
          return ctx.body = {
            status: 'success',
            token: token,
            user: admin.name
          }
        } else {
          error = 'Invalid password!'
        }
      } else {
        error = "User doesn't exist"
      }

      if (error) {
        return ctx.body = {
          status: 'fail',
          message: error
        }
      }
    } catch(e) {
      // statements
      log.error(e)
    }
  },
  logout: async ctx => {
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

    await redis.del(token)
    return ctx.body = {
      status: 'success',
      message: 'Token deleted'
    }
  },
  permission: async (ctx, next) => {
    try {
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
    } catch (err) {
      log.error(err)
      return ctx.body = {
        status: 'fail',
        message: 'Token verify failed'
      }
    }
  }
}
