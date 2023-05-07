import {natsIntergrationBusImpl} from '../../../shared/module/nats.impl';
import {registrationCreatedSub} from './registered.sub';

natsIntergrationBusImpl.addIntergrationEventSubscriber(registrationCreatedSub);