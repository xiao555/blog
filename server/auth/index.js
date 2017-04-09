import jwt from 'jsonwebtoken'
import log from '../utils/log'
const  secret = 'blogAuth'
const  expiresIn = Math.floor(Date.now() / 1000) + (60 * 60) // 1h
export default {
    createToken (userinfo) {
        return jwt.sign(userinfo, secret, { expiresIn: 60 * 60 })
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