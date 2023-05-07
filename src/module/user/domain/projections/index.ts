import {userSrv} from '../../services/user.bootsrap';
import RegistrationProjector from './user.projector';
import {userRepo} from '../repo';
import UserCreatedEventProjection from './usercreated.event';

const userProjector = new RegistrationProjector(userSrv);
const providerCreatedEventProjection = new UserCreatedEventProjection(userSrv.getIntergrationBus(),userRepo);

userProjector.addAggregateEventProjection(providerCreatedEventProjection);

export {userProjector}
