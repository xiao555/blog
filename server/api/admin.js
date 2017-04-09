import Token from '../auth'
import log from '../utils/log'
import User from '../models/user'
import redis from '../db/redis'

export default {
  login: async ctx => {
    try {
      const result = await User.findOne({ name: ctx.request.body.name})
      console.log(ctx.request.body, result)
      if (!result) {
        return ctx.body = {
          status: 'fail',
          message: "User doesn't exist"
        }
      }

      if (result.password === ctx.request.body.password) {
        const token = Token.createToken({ data: result.name })
        console.log('token', token)
        redis.set(token, result.name)
        redis.expire(token, Token.expiresIn)
        return ctx.body = {
          status: 'success',
          token: token,
          user: result
        }
      } else {
        return ctx.body = {
          status: 'fail',
          message: 'Invalid password!'
        }
      }
    } catch(e) {
      // statements
      console.log(e);
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
  register: async ctx => {
    try {
      console.log(ctx.request.body)
      const user = ctx.request.body
      ctx.body = {}
      const email = await User.findOne({email: user.email})
      if (email) {
        ctx.body.status = 'no'
        return ctx.body.message = 'This email is already saved'
      }
      const name = await User.findOne({name: user.name})
      if (name) {
        ctx.body.status = 'no'
        return ctx.body.message = 'This name is already saved'
      }
      const result = await User.create(user)
      if (result) return ctx.body = {
        status: 'success'
      }
    } catch(e) {
      // statements
      console.log(e);
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
      return
    }
  }
}
