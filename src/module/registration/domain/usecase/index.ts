import {natsIntergrationBusImpl} from '../../../../shared/module/nats.impl'
import {registrationSrv} from '../../services/registration.bootsrap';
import {registrationRepo} from '../repo';
import CreateRegistrationUseCase from './create.usecase';
import ValidateRegistrationUseCase from './validate.usecase';

const createRegistrationUseCase = new CreateRegistrationUseCase(registrationRepo,registrationSrv,natsIntergrationBusImpl);
const validateRegistrationUseCase = new ValidateRegistrationUseCase(registrationRepo,registrationSrv)
export {createRegistrationUseCase ,validateRegistrationUseCase}