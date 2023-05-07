import {repoImpl} from '../../../../shared/database';
import {userMapper} from '../mapper';
import UserRepo from './user.repo';


const userRepo = new UserRepo(repoImpl,userMapper);
export {userRepo}