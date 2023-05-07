import * as  os from 'os';
import { PoolConfig } from "pg";
import {v4 as uuidv4} from 'uuid';
import nats , {IPGPoolConfig} from '@nana-tec/providers';
import {IDefinition} from '@nana-tec/core'

const NatsConfig:nats.ConnectionOptions = {
    servers: "localhost:4222"
}

const pgDBConfig:IPGPoolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123!',
   // database: process.env.DB_NAME || 'unittrust',
    port:parseInt(process.env.DB_PORT || "5432"),
    max: 0,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 2000
}



const moduleDefinition:IDefinition={
    name: 'usermanagement',
    version: 'v1',
    description: 'Usermanagement Module'
}

const authConfig = {
    secret: process.env.APP_SECRET || 'TopSecret123!',
    tokenExpiryTime: 300, // seconds => 5 minutes
    redisServerPort: process.env.REDIS_PORT || 6379,
    redisServerURL: process.env.REDIS_URL || 'redis://localhost:6379',
    redisConnectionString: process.env.REDIS_URL || 'redis://localhost:6379',
}

const isProduction = process.env.IS_PRODUCTION === "true";


export {
    pgDBConfig ,
    NatsConfig ,
    moduleDefinition ,
    authConfig ,
    isProduction
  }
