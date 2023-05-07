
import {registrationSrv} from '../../services/registration.bootsrap';
import RegistrationProjector from './registration.projector';
import {registrationRepo} from '../repo';
import RegistrationValidationEventProjection from './registration.validated.event';

const registrationProjector = new RegistrationProjector(registrationSrv);
const providerCreatedEventProjection = new RegistrationValidationEventProjection(registrationSrv.getIntergrationBus(),registrationRepo);

registrationProjector.addAggregateEventProjection(providerCreatedEventProjection);

export {registrationProjector}
