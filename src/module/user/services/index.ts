import {userSrv} from './user.bootsrap';
import {createUserApi ,loginUserApi ,logoutUserApi} from '../api';
//import * as subscriptions from '../subscriptions';
//import {createProviderUseCase} from '../domain/usecase';
import {userProjector} from '../domain/projections';
//providerProjector.start();
//registrationValidationApi.init();
//createRegistrationApi.init();
createUserApi.init();
loginUserApi.init();
logoutUserApi.init();
//userProjector.start()
console.log(" === User api service started ===")
export {userSrv,createUserApi ,userProjector}