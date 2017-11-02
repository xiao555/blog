import redis from 'redis'
import bluebird from 'bluebird'
import log from '../utils/log'
import { redisConfig } from '../config'

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient(redisConfig);

client.on("error", function (err) {
    log.error("Redis Error " + err);
});

client.on('connect', function () {
    log.info('Redis is ready');
});

export default client