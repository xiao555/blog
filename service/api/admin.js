import Token from '../auth'
import log from '../utils/log'
import User from '../models/user'
import redis from '../db/redis'

export default {
  login: async ctx => {
    try {
      const result = await model.findOne(ctx.request.body.name)
      console.log(ctx.request.body, result)
      if (result) {
        return ctx.body = {
          status: 'no',
          message: "User doesn't exist"
        }
      }

      if (result.password === ctx.request.body.password) {
        const token = Token.createToken({
          data: result.name,
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
        })

        redis.set(token, { is_expired: true})
        redis.expire(token, Token.expiresIn)
        return ctx.body = {
          status: 'yes',
          token: token
        }
      } else {
        return ctx.body = {
          status: 'no',
          message: 'Invalid password!'
        }
      }
      
      ctx.body = {}
      ctx.body.status = result ? 'yes' : 'no'
      ctx.body.user = result
    } catch(e) {
      // statements
      console.log(e);
    }
  }
}
