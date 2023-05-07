
import {IIntergrationEventMessage, IIntergrationEventSubscriber, ESubscriptionType,Result} from '@nana-tec/core';


const registrationCreatedSub:IIntergrationEventSubscriber = {
    eventName: 'registrationCreated',
    subscriptionType: ESubscriptionType.recur,
    subscriberDetails: {
      moduleName:"usermanagement",
      moduleVersion:"v1" ,
      serviceName:"registration",
      serviceVersion:"v1" ,
      subscriberName:"userRegistration"
    },
    handler: async function (intergrationEventMessage: IIntergrationEventMessage): Promise<Result<boolean, string>> {
       console.log(" === Registration Event come in ====" ,intergrationEventMessage)
       return Result.ok(true)
    }
}

export {registrationCreatedSub}


