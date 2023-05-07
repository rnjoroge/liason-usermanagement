import {registrationSrv} from './registration.bootsrap';
import {registrationValidationApi ,createRegistrationApi} from '../api';
import * as subscriptions from '../subscriptions';
//import {createProviderUseCase} from '../domain/usecase';
import {registrationProjector} from '../domain/projections';
//providerProjector.start();
registrationValidationApi.init();
createRegistrationApi.init();
registrationProjector.start();
console.log(" === Registration api service started ===")
export {registrationSrv ,registrationProjector ,subscriptions}
