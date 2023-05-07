import {BaseEventProjection, IProjectionContext, Result ,IntergrationEventBroker ,IEventProjectionDefinition ,Logger} from '@nana-tec/core';
import {IRegistrationRepo} from '../repo/iregistration.repo';


export default class RegistrationValidationEventProjection extends BaseEventProjection {


    constructor (intergrationBus :IntergrationEventBroker ,private repo:IRegistrationRepo) {
        const eventProjectionDetails:IEventProjectionDefinition={
            eventName: 'validated',
            definition: {
             name:"validationProjection",
             version:"v1",
             description:"projection run for registration once validated"
            }
        }
      super(eventProjectionDetails,intergrationBus)
     }

   async onEvent<P>(projectionContext: IProjectionContext<P>): Promise<Result<void, string>> {
 //   console.log(" Projection validation event come in ",projectionContext.eventData)
        await this.repo.saveViewData(projectionContext.eventData); 
        // posgree
        // mongo
        return Result.success();
    }

}