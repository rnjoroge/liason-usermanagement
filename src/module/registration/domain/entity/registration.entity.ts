import { AggregateRoot ,Result ,UniqueEntityID ,Guard ,BaseDomainEntity, IDefinition } from "@nana-tec/core";
import {EmailValueObject ,DateValueObject ,PinValueObject} from "@nana-tec/core";

export interface IUserEntity {
    entityId:string;
    entityType:string;
}

export enum ERegistrationType {
    "self"="self",
    "entity"="entity"
}

export interface IRegistrationProps extends BaseDomainEntity  {
    registrationEmail:EmailValueObject;
    userEntity:IUserEntity;
    registrationDate:DateValueObject;
    expiryDate:DateValueObject;
    validationCode:PinValueObject;
    registrationType:ERegistrationType;
    registrationId:string;
    validationDate?:DateValueObject;
    isValidated?:boolean;
    id?:string;
}

export const RegistrationAggregateDefinition:IDefinition= {
    name:"registration",
    version:"v1",
    description:"Registration entity"
}


 export default class RegistrationEntity extends AggregateRoot<IRegistrationProps>  {

   get registrationEmail () :EmailValueObject{
     return this.props.registrationEmail;
   }

   get userEntity () :IUserEntity {
    return this.props.userEntity;
   }

   get registrationDate ():DateValueObject {
    return this.props.registrationDate;
   }

   get expiryDate () :DateValueObject {
    return this.props.expiryDate;
   }
  
   get validationCode () : PinValueObject {
    return this.props.validationCode;
   }

   get registrationType ():ERegistrationType {
    return this.props.registrationType;
   }

   get registrationId () :string {
    return this.props.registrationId;
   }

   get validationDate () : DateValueObject {
    return this.props.validationDate || DateValueObject.create().getResult();
   }

   get isValidated () :boolean {
    return this.props.isValidated || false;
   }

   

    private constructor (props: IRegistrationProps, id?: UniqueEntityID) {
		super(props,RegistrationAggregateDefinition );
	}

    public static create (props: IRegistrationProps, id?: UniqueEntityID):Result<RegistrationEntity>{

        const guardedProps = [
            { argument: props.registrationEmail, argumentName: 'registrationEmail' },
            { argument: props.userEntity.entityId, argumentName: 'entityId' } ,
            { argument: props.userEntity.entityType, argumentName: 'entityType' } ,
            { argument: props.registrationDate, argumentName: 'registrationDate' } ,
            { argument: props.expiryDate, argumentName: 'expiryDate' } ,
            { argument: props.registrationType, argumentName: 'registrationType' } ,
            { argument: props.registrationId, argumentName: 'registrationId' } ,
            
            
          ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
              return Result.fail<RegistrationEntity>(guardResult.message || 'Props validation error')
        }  
        
       // const isNewRegistration = !!id === false;
         if(id) {
            props.isValidated=false;
            props.validationDate=DateValueObject.create().getResult();
         }
        const registrationEntity =new RegistrationEntity(props,id);
        //registrationEntity.addDomainEvent("created",props,{},"v1")

        return Result.ok(registrationEntity);

    }

    public validateCode (validationCode: string) :Result<boolean>{
        if(this.props.isValidated) {
            return Result.fail(` Registration already validated .`);
        }
        const pinVo = PinValueObject.create(validationCode);
        if(pinVo.isFailure) {
           return Result.fail(pinVo.error);
        }

        const isValid = this.validationCode.compare(validationCode);
        if(!isValid) {
            return Result.fail(`Invalid Validation Code "${validationCode}" .`);
        }

        if(this.expiryDate.isBefore(new Date())) {
            return Result.fail(`Registration has already expired .`);  
        }
        this.props.isValidated=true;
        this.props.validationDate = DateValueObject.create().getResult();
        this.addDomainEvent("validated",this.props,{},"v1");
        return Result.ok(true);
    }


 }
