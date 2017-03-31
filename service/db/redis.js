import redis from 'redis'
import bluebird from 'bluebird'
import log from '../utils/log'

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

client.on("error", function (err) {
    log.error("Redis Error " + err);
});

client.on('connect', function () {
    log.info('Redis is ready');
});

export default client