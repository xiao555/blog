import jwt from 'jsonwebtoken'
import log from './utils/log'
const  secret = 'blogAuth'
const  expiresIn = 3600 // 1h
export default {
    createToken (userinfo) {
        return jwt.sign(userinfo, secret, { expiresIn })
    },
    verifyToken (token) {
        if (!token) return false
        try{
            return jwt.verify(token, secret)
        }catch(err){
            log.error(err)
            return false
        }
    },
    expiresIn,
}