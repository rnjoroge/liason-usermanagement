import {BaseAggregateProjector ,IDomainService ,IDefinition} from '@nana-tec/core';
import {IUserProps ,UserAggregateDefinition} from '../entity/user.entity'

export default class UserProjector extends BaseAggregateProjector<IUserProps> {

    constructor (domainService:IDomainService ) {
         const aggregateProjectorDefinition:IDefinition = {
             name: 'UserProjector',
             version: 'v1',
             description: 'User Projector'
         }
         super(domainService,aggregateProjectorDefinition,UserAggregateDefinition);
    }

}