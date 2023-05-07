import * as redis from "redis"
import { Logger } from "@nana-tec/core";
import { authConfig, isProduction } from '../../../config/config';

/*
class RedisConn {
    private port:number;
    private host:string;
    constructor () {

    }
    async connect ():Promise<redis.RedisClientType> {
        try {
            this.port = Number(authConfig.redisServerPort);
            this.host = authConfig.redisServerURL; 

            const redisConnection: redis.RedisClientType =  redis.createClient({
                url: authConfig.redisConnectionString
              }); 
              redisConnection.on('connect', () => {
                console.log(`[Redis]: Connected to redis server at ${this.host}:${this.port}`)
              });

         
            return redisConnection;
        } catch (error) {
            Logger.error(error)  
            return error;
        }

    }
}
*/
const port = Number(authConfig.redisServerPort);
const host = authConfig.redisServerURL;
const redisConnection: redis.RedisClientType =  redis.createClient({
    url: authConfig.redisConnectionString
  }); 
  redisConnection.on('connect', () => {
    console.log(`[Redis]: Connected to redis server at ${host}:${port}`)
  });




export { redisConnection }