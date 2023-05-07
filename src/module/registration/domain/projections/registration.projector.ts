import {BaseAggregateProjector ,IDomainService ,IDefinition} from '@nana-tec/core';
import {IRegistrationProps ,RegistrationAggregateDefinition} from '../entity/registration.entity'

export default class RegistrationProjector extends BaseAggregateProjector<IRegistrationProps> {

    constructor (domainService:IDomainService ) {
         const aggregateProjectorDefinition:IDefinition = {
             name: 'registrationProjector',
             version: 'v1',
             description: 'Registration for Provider'
         }
         super(domainService,aggregateProjectorDefinition,RegistrationAggregateDefinition);
    }

}