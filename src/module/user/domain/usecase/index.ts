import {natsIntergrationBusImpl} from '../../../../shared/module/nats.impl';
import {redisAuthService} from '../../../../shared/database/index'
import {userSrv} from '../../services/user.bootsrap';
import {registrationRepo} from '../../../registration/domain/repo';
import {userRepo} from '../repo';
import CreateUserUseCase from './createuser.usecase';
import LoginUseCase from './login.usecase';
import LogoutUseCase from './logout.usecase'

const createUserUseCase = new CreateUserUseCase(userRepo,registrationRepo,userSrv,natsIntergrationBusImpl);
const loginUseCase = new LoginUseCase(userRepo,redisAuthService,userSrv,natsIntergrationBusImpl);
const logoutUseCase = new LogoutUseCase(userRepo,redisAuthService,userSrv,natsIntergrationBusImpl);
export {createUserUseCase ,loginUseCase ,logoutUseCase}