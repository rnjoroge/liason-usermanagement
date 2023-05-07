import {BaseEventProjection, IProjectionContext, Result ,IntergrationEventBroker ,IEventProjectionDefinition ,Logger} from '@nana-tec/core';
import {IUserRepo} from '../repo/iuser.repo';


export default class UserCreatedEventProjection extends BaseEventProjection {


    constructor (intergrationBus :IntergrationEventBroker ,private repo:IUserRepo) {
        const eventProjectionDetails:IEventProjectionDefinition={
            eventName: 'userCreated',
            definition: {
             name:"userCreatedProjection",
             version:"v1",
             description:"projection run for user once created"
            }
        }
      super(eventProjectionDetails,intergrationBus)
     }

   async onEvent<P>(projectionContext: IProjectionContext<P>): Promise<Result<void, string>> {
 //   console.log(" Projection validation event come in ",projectionContext.eventData)
       // await this.repo.saveViewData(projectionContext.eventData); 
        // posgree
        // mongo
        return Result.success();
    }

}