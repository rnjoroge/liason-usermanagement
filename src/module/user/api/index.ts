import {userSrv} from '../services/user.bootsrap';
import {createUserUseCase ,loginUseCase,logoutUseCase} from '../domain/usecase';
import CreateUserApi from './command/createuser.cmd';
import LoginUserApi from './command/login.cmd';
import LogoutUserApi from './command/logout.cmd';

const createUserApi = new CreateUserApi(createUserUseCase,userSrv.getServiceApiRegistry());
const loginUserApi = new LoginUserApi(loginUseCase,userSrv.getServiceApiRegistry());
const logoutUserApi = new LogoutUserApi(logoutUseCase,userSrv.getServiceApiRegistry());
export {createUserApi ,loginUserApi,logoutUserApi}
