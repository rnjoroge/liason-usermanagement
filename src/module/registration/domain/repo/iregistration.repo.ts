
import RegistrationEntity , {IUserEntity,ERegistrationType} from '../entity/registration.entity'
import { Result } from "@nana-tec/core";



export interface IRegistrationModel  {
    registrationEmail:string;
    userEntity:IUserEntity;
    registrationDate:string;
    expiryDate:string;
    validationCode:string;
    registrationType:ERegistrationType;
    id:string;
    isValidated:boolean;
    validationDate:string;
    registrationId:string;
}


export interface IRegistrationRepo {

    saveRegistration(registration:RegistrationEntity):Promise<Result<void>>;
    getRegistration(validationID:string):Promise<Result<RegistrationEntity>>; 
    saveViewData(data:any):Promise<Result<void>>; 
    updateRegistration(registration:RegistrationEntity):Promise<Result<void>>; 
}