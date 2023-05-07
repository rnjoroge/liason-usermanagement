
import {registrationSrv} from '../services/registration.bootsrap';

import {createRegistrationUseCase ,validateRegistrationUseCase} from '../domain/usecase';

import CreateRegistrationApi from './command/registration.cmd';
import RegistrationValidationApi from './command/validation.cmd';

const createRegistrationApi = new CreateRegistrationApi(createRegistrationUseCase,registrationSrv.getServiceApiRegistry());
const registrationValidationApi  = new RegistrationValidationApi(validateRegistrationUseCase,registrationSrv.getServiceApiRegistry());
export {createRegistrationApi ,registrationValidationApi}


