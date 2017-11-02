import jwt from 'jsonwebtoken'
import log from '../utils/log'
import config from '../config'

export default {
  createToken (userinfo) {
    return jwt.sign(userinfo, config.authSecret, { expiresIn: config.expiresIn })
  },
  verifyToken (token) {
    if (!token) return false
    try{
      return jwt.verify(token, config.authSecret)
    }catch(err){
      log.error(err)
      return false
    }
  }
}