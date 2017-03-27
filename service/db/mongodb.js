import mongoose from 'mongoose'
import log from '../utils/log'
mongoose.Promise = global.Promise;


export function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => log.warn('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(uri)
  })
}
