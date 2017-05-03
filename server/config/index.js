export default {
  admin: {
    name: 'xiao555',
    passwd: 'passwd'
  },
  mongoDB: 'mongodb://localhost/blog',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  port: process.env.PORT || 3000,
  authSecret: 'blogAuth',
  expiresIn: 60 * 60, // token 1h
}