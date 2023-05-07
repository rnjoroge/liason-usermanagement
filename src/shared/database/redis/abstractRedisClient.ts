import * as redis from "redis";

export abstract class AbstractRedisClient {
  private tokenExpiryTime: number = 604800;
  protected client: redis.RedisClientType;

  constructor (client: redis.RedisClientType) {
    this.client = client;
  }

  public async count (key: string): Promise<number> {
    const allKeys = await this.getAllKeys(key);
    return allKeys.length;
  }

  public exists (key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return this.count(key)
        .then((count) => {
          return resolve(count >= 1 ? true : false)
        })
        .catch((err) => {
          return reject(err);
        })
    })
  }

  public async getOne<T> (key: string): Promise<T> {
    return  this.client.get(key) as T
  }

  public getAllKeys(wildcard: string): Promise<string[]> {
    return  this.client.keys(wildcard)
  } 

  public async getAllKeyValue (wildcard: string): Promise<any[]> {


    const results= await this.client.keys(wildcard) 
    const allResults = await Promise.all(
        results.map( async (key) => {
          const value = await this.getOne(key);
          return { key, value }
        }))
    return allResults;
  }

  public async set(key: string, value: any): Promise<any> {
 
    try {
        await this.client.set(key, value)
        await this.client.expire(key, this.tokenExpiryTime);
    } catch (error) {
        throw error;
    }

  }

  public deleteOne (key: string): Promise<number> {
    return this.client.del(key);
  }

  public testConnection (): Promise<any> {
   return this.set("test","connected");
  }
}