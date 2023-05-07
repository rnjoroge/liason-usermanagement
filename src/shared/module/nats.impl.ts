import {NatsConfig ,moduleDefinition} from '../../config/config';

import NatsConnImpl from '@nana-tec/providers/lib/broker/nats/nats.connection';
import  NatsImpl from '@nana-tec/providers/lib/broker/nats/nats.impl';
import NatsEventStore from '@nana-tec/providers/lib/broker/nats.eventstore';
import NatsDomainEventBusImpl from '@nana-tec/providers/lib/broker/nats.domaineventbus';
import NatsIntergrationBusImpl from '@nana-tec/providers/lib/broker/nats.intergrationbus';
import NatsProxy from '@nana-tec/providers/lib/broker/nats.apiproxy';
import NatsApiserver from '@nana-tec/providers/lib/broker/nats.apiserver';
import IntergrationRegistry from '@nana-tec/core/lib/core/intergration/intergration-registry.impl'



const intergrationRegistry = new IntergrationRegistry();
const natsConnImpl = new NatsConnImpl(NatsConfig);
const natsImpl = new NatsImpl(natsConnImpl);
const natsEventStore = new NatsEventStore(natsImpl);
const natsDomainEventBusImpl = new NatsDomainEventBusImpl(natsImpl);
const natsIntergrationBusImpl = new NatsIntergrationBusImpl(natsImpl ,moduleDefinition,intergrationRegistry);
const natsProxy = new NatsProxy(natsImpl);
const natsApiserver = new NatsApiserver(natsImpl)

//

export {intergrationRegistry,natsConnImpl,natsEventStore,natsDomainEventBusImpl,natsIntergrationBusImpl ,natsProxy,natsApiserver}



