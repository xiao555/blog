import log4js from 'log4js'
import path from 'path'
const env = process.env.NODE_ENV
if(env == 'production') {
  log4js.configure({
    appenders: [
      { type: 'file', filename: path.join(__dirname,'..', 'log/cheese.log')}
    ]
  });
}

let log = log4js.getLogger('TYPE')
export default log4js.getLogger('Blog')

log.debug("LOG TYPE:")
log.debug('DEBUG')
log.info('INFO')
log.warn('WARN')
log.error('ERROR')
log.fatal('FATAL')
