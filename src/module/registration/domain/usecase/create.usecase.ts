
import { AppError ,Either ,IUseCase ,Result, left, right ,DomainId ,UniqueEntityID ,IDomainService, IDefinition} from "@nana-tec/core";
import {EmailValueObject,IIntergrationEventMessage,IIntergrationBroker ,DateValueObject ,PinValueObject ,IApiEventData} from "@nana-tec/core";
import BaseUseCase from '@nana-tec/core/lib/core/usecase/base-usecase.interface';
import {IRegistrationRepo} from '../repo/iregistration.repo';
import RegistrationEntity ,{IUserEntity ,ERegistrationType} from '../entity/registration.entity';
import {RegistrationError} from './createusecase.error';





export interface ICreateRegistrationDTO {
     registrationEmail:string;
     userEntity:IUserEntity;
     registrationType:string;
}

const usecaseDetails:IDefinition =  {
    name: "createRegistration",
    version: "v1",
    description: "Usecase that handles Registration Request"
}

type Response = Either< 
  RegistrationError.InvalidEmail |
  RegistrationError.RegistrationValidationError |
  AppError.UnexpectedError |
  Result<any>, 
  Result<void>
>

export default class CreateRegistrationUseCase extends BaseUseCase implements IUseCase<ICreateRegistrationDTO, Promise<Response>> 
{

   constructor (private registrationRepo:IRegistrationRepo ,registrationDomainService:IDomainService,private intergrationBroker:IIntergrationBroker) {
        super(usecaseDetails,registrationDomainService)
   }

   async execute(request: ICreateRegistrationDTO ): Promise<Response>  {
        try {
      
        const EmailorError =  EmailValueObject.create(request.registrationEmail);
        if(EmailorError.isFailure) {
            return left(new RegistrationError.InvalidEmail(request.registrationEmail)) as Response;
        }
        let regType:ERegistrationType=ERegistrationType.self;
        if(!request.registrationType) {
            return left(new RegistrationError.RegistrationValidationError("Registration Type Required")) as Response; 
        }
        else{
            if(request.registrationType.toLocaleLowerCase() =='entity') {
                regType=ERegistrationType.entity;
            }
        }

        const pin = PinValueObject.generatePin({numbersLength:4,lettersLength:0});
        const registrationDate = DateValueObject.create();
        const expiryDate = DateValueObject.create()
              expiryDate.getResult().addDays(1)
        const id=DomainId.create(); 
        const idd =new  UniqueEntityID(id.toString()); // remember to use uuidto make them unique across multiple services

        const registrationEntity = await RegistrationEntity.create(
         {
            registrationEmail:EmailorError.getResult(),
            registrationDate:registrationDate.getResult(),
            expiryDate:expiryDate.getResult(),
            validationCode:pin.getResult(),
            registrationType:regType ,
            userEntity:request.userEntity,
            registrationId:id.toString(),
            id:id.toString(),
            ID:id
         },idd
        )
       
        if(registrationEntity.isFailure) {
          //  console.log(" Registration Error ",registrationEntity.error)
            return left(Result.fail<void>(registrationEntity.error)) as Response;
        }
      
         const registrationSaveResponse =await this.registrationRepo.saveRegistration(registrationEntity.getResult());
         //console.log(" registrationSaveResponse ",registrationSaveResponse)
         if(registrationSaveResponse.isFailure) {
            return left(Result.fail<void>(registrationSaveResponse.error)) as Response;
         }
         const intergrationEvent:IIntergrationEventMessage = {
            eventName: "registrationCreated",
            eventPublisher: {
                moduleName:"urmg",
                moduleVersion:"v1",
                serviceName:"registration",
                serviceVersion:"v1"
            },
            eventDate: new Date().toISOString(),
            eventData: registrationEntity.getResult().toObject(),
            eventReply:{
              reply:false,
              replyInbox:""
            },
            eventID: id.toString()
        }

        const notificationEvnt:IApiEventData = {
            apiEventName: "sendEmail",
            apiEventModule:{
                name:"notification",
                version:"v1"
            },
            apiEventPublisherDet: {
              module:{
                name:"usermanagement",
                version:"v1"
              },
              service:{
                name:"registration",
                version:"v1"
              }
            },
            apiEventData: {
                sender:{
                    entityId:"system",
                    entityType:"system",
                    userid:"system", 
                },
                notificationType:"email",
                notificationTitle:`User Registration `,
                notificationMessage:`Your Registration code is .${pin.getResult().value}`,
                notificationExternalRef:id.toString(),
                to:[request.registrationEmail],
                notificationEventname:"urmg.registration"  // the event that raised this notification in the form {version}.{module} // will use the form to extract module and service
            }
        }
        await this.intergrationBroker.publishApiEvent(notificationEvnt);
        await this.intergrationBroker.publishIntergrationEvent(intergrationEvent);
        // ok for now also send email  later we will use event


        
         return right(Result.ok<any>(id.toString())) as Response;   
         
         
        } catch (error) {
            return left(AppError.UnexpectedError.create(error))
        }
    }


}


