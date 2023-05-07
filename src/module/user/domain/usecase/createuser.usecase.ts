import { AppError ,Either ,IUseCase ,Result, left, right ,DomainId ,UniqueEntityID ,IDomainService, IDefinition} from "@nana-tec/core";
import {EUserStatus,EUserEntity,EUserSubtype ,EUserType,IIntergrationBroker ,DateValueObject ,PinValueObject ,IApiEventData} from "@nana-tec/core";
import BaseUseCase from '@nana-tec/core/lib/core/usecase/base-usecase.interface';
import {IUserRepo} from '../repo/iuser.repo';
import {IRegistrationRepo} from '../../../registration/domain/repo/iregistration.repo'
import UserEntity ,{ICreateUserProps } from '../entity/user.entity';
import {UserError} from './createuser.error';
import {UserName} from  '../entity/username.entity'
import {UserPassword} from '../entity/userpassword.vo'
export interface ICreateUserDTO {

    username: string;
    password: string;
   // entity:EUserEntity ;
   // userType:EUserType;
   // userSubType:EUserSubtype;
   // entityId:string;
   // entityUserRef:string;
  //  userId:string;
    registrationId:string;

}

const usecaseDetails:IDefinition =  {
   name: "createUser",
   version: "v1",
   description: "Usecase that handles User Registration"
}


type Response = Either< 
  UserError.EntityUserNameExistsError |
  UserError.InvalidRegistrationId |
  UserError.UsernameError | 
  UserError.PasswordError | 
  UserError.UserEntity |
  UserError.InvalidUsername | 
  AppError.UnexpectedError |
  Result<any>, 
  Result<void>
>

export default class CreateUserUseCase extends BaseUseCase implements IUseCase<ICreateUserDTO, Promise<Response>> 
{

   constructor (private userRepo:IUserRepo,private registrationRepo:IRegistrationRepo ,userDomainService:IDomainService,private intergrationBroker:IIntergrationBroker) {
        super(usecaseDetails,userDomainService)
   }

   async execute(request: ICreateUserDTO): Promise<Response>  {
       try {
console.log(" == Doing user registration === 1.")
        const registrationEntity = await this.registrationRepo.getRegistration(request.registrationId);
         if(registrationEntity.isFailure) {
             return left(new UserError.RegistrationPendingValidation(registrationEntity.error)) as Response;
         }

         if(!registrationEntity.getResult()) {
            return left(new UserError.InvalidRegistrationId(request.registrationId)) as Response;  
         }

         if(!registrationEntity.getResult().isValidated) {
            return left(new UserError.RegistrationPendingValidation(request.registrationId)) as Response;
         }
         console.log(" == Doing user registration === 2.")
         const userExists = await this.userRepo.entityUsernameExists(request.username);
         if(userExists.isFailure) {
            return left(AppError.UnexpectedError.create(userExists.error))
         }
         if(userExists.getResult()) {
            return left(new UserError.UsernameError("Username Already Exists")) as Response;
         }
         console.log(" == Doing user registration === 3.")
         const userName =UserName.create({name:request.username});
         if(userName.isFailure) {   
            return left(new UserError.UsernameError(userName.error)) as Response;
         }
         const pwd= UserPassword.create({value:request.password})
         if(pwd.isFailure) {
            return left(new UserError.PasswordError(pwd.error)) as Response;
         }
         const id=DomainId.create(); 
         console.log(" == Doing user registration === 4.")
        const userEntity= UserEntity.createUser({
             email: registrationEntity.getResult().registrationEmail,
             username: userName.getResult(),
             password: pwd.getResult(),
             entity: EUserEntity.admin,
             userType: EUserType.system,
             userSubType: EUserSubtype.admin,
             entityId: registrationEntity.getResult().userEntity.entityId,
             entityUserRef: registrationEntity.getResult().userEntity.entityId,
             userId: id.toString(),
             registrationId: request.registrationId,
             createdDate: DateValueObject.create().getResult(),
             createdBy: ""
         });

         if(userEntity.isFailure) {
            return left(new UserError.UserEntity(pwd.error)) as Response;
         }
         const userSave=await this.userRepo.saveUser(userEntity.getResult());
         console.log(" == Doing user registration === 5.")
         if(userSave.isFailure) {
            return left(AppError.UnexpectedError.create(userSave.error))
         }
      
         let aggSavedResponse= await this.saveAggregate(userEntity.getResult());
         console.log(" == Doing user registration === 6.")
         if(aggSavedResponse.isFailure) {
          return left(new AppError.UnexpectedError(aggSavedResponse.error)) as Response;
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
                name:"user",
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
                notificationTitle:`Registration Success `,
                notificationMessage:"Registration Success Welcome ",
                notificationExternalRef:id.toString(),
                to:[ registrationEntity.getResult().registrationEmail],
                notificationEventname:"urmg.createUser"  // the event that raised this notification in the form {version}.{module} // will use the form to extract module and service
            }
        }
        await this.intergrationBroker.publishApiEvent(notificationEvnt);
        console.log(" == Doing user registration === 7.")

        // fetch registration id 


        return right(Result.ok<any>(id.toString())) as Response;   
       } catch (error) {
              return left(AppError.UnexpectedError.create(error))
       }
    }

}  



