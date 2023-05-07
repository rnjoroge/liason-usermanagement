
import { AppError ,Either ,IUseCase ,Result, left, right ,DomainId ,UniqueEntityID ,IDomainService, IDefinition} from "@nana-tec/core";
import { IIntergrationBroker, IIntergrationEventMessage, EmailValueObject ,DateValueObject ,PinValueObject} from "@nana-tec/core";
import BaseUseCase from '@nana-tec/core/lib/core/usecase/base-usecase.interface';
import {IRegistrationRepo} from '../repo/iregistration.repo';
import RegistrationEntity ,{IUserEntity ,ERegistrationType} from '../entity/registration.entity';
import {ValidationUsecaseError} from './validation.error'

const usecaseDetails:IDefinition =  {
    name: "registrationValidation",
    version: "v1",
    description: "Usecase that handles Registration Validation"
}

export interface IRegistrationValidationDTO {
    registrationId:string;
    registrationCode:string;

}

type Response = Either< 
  ValidationUsecaseError.InvalidRegistrationId |
  ValidationUsecaseError.CodeExpired |
  ValidationUsecaseError.InvalidRegistration | 
  AppError.UnexpectedError |
  Result<any>, 
  Result<void>
>


export default class ValidateRegistrationUseCase extends BaseUseCase implements IUseCase<IRegistrationValidationDTO, Promise<Response>> 

{

    constructor (private registrationRepo:IRegistrationRepo ,registrationDomainService:IDomainService ) {
        super(usecaseDetails,registrationDomainService)
   }

   async execute(request: IRegistrationValidationDTO): Promise<Response>  {
       try {
        const registrationEntity = await this.registrationRepo.getRegistration(request.registrationId);

       // console.log(" == registrationEntity == ",registrationEntity)
        if(registrationEntity.isFailure) {
            return left(new ValidationUsecaseError.InvalidRegistration(registrationEntity.error)) as Response;
        }

      
        const isCodeValid = registrationEntity.getResult().validateCode(request.registrationCode);
        if(isCodeValid.isFailure) {
            return left(new ValidationUsecaseError.InvalidRegistration(isCodeValid.error)) as Response;
        }

        let entityRepoUpdate = await this.registrationRepo.updateRegistration(registrationEntity.getResult());
         if(entityRepoUpdate.isFailure) {
            return left(Result.fail<void>(entityRepoUpdate.errorValue())) as Response;
         }

        let aggSavedResponse= await this.saveAggregate(registrationEntity.getResult());
        
        if(aggSavedResponse.isFailure) {
         return left(new AppError.UnexpectedError(aggSavedResponse.error)) as Response;
        }
        return right(Result.ok<any>('Validation success.')) as Response;  
       } catch (error) {
        return left(AppError.UnexpectedError.create(error))
       }
    }


}  