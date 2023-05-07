import {natsEventStore,natsDomainEventBusImpl,natsIntergrationBusImpl,natsApiserver} from './nats.impl';
import {IModuleInstanceDefinition } from '@nana-tec/core';
import {moduleDefinition} from '../../config/config';
import MemoryApiRegistry from '@nana-tec/core/lib/core/api/api.registry';
import UrmgModule from './urmg.module';
import  { v4 as uuidv4 } from 'uuid';
const memoryApiRegistry = new MemoryApiRegistry();



const urmgModuleDefinition:IModuleInstanceDefinition = {
    moduleInstanceID: uuidv4(),
    name: moduleDefinition.name,
    version: moduleDefinition.version,
    description: moduleDefinition.description
}



const urmgModule = new UrmgModule(urmgModuleDefinition,natsEventStore,natsDomainEventBusImpl,natsIntergrationBusImpl,memoryApiRegistry,natsApiserver);

export default urmgModule;