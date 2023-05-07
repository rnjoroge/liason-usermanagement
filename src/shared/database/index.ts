import {pgDBConfig} from '../../config/config'
import PGConnection from '@nana-tec/providers/lib/database/pg.connection';
import pgRepoImpl from '@nana-tec/providers/lib/database/pg.repoimpl';
import {RedisAuthService} from './redis/redisAuthService'
import {redisConnection} from './redis/redisConnection';


const redisAuthService = new RedisAuthService(redisConnection)
const pGConnection = new PGConnection(pgDBConfig)
const repoImpl = new pgRepoImpl(pGConnection);
export {pGConnection ,repoImpl ,redisAuthService};