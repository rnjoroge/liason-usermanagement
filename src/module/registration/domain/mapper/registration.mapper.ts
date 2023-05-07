import { IMapper, DomainId ,EmailValueObject ,DateValueObject ,PinValueObject} from '@nana-tec/core';
import RegistrationEntity ,{ERegistrationType} from '../entity/registration.entity';
import {IRegistrationModel} from '../repo/iregistration.repo';


export default class RegistrationMapper implements IMapper<RegistrationEntity, IRegistrationModel>{


    toDomain (target: IRegistrationModel ) : RegistrationEntity {
        //console.log(" == mapper result === ",target)
        return RegistrationEntity.create(
          {
             ID:DomainId.create(target.id),
             registrationEmail:EmailValueObject.create(target.registrationEmail).getResult(),
             registrationDate:DateValueObject.create(new Date(target.registrationDate)).getResult(),
             registrationType:ERegistrationType[target.registrationType],
             expiryDate:DateValueObject.create(new Date(target.expiryDate)).getResult(),
             validationCode:PinValueObject.create(target.validationCode).getResult(),
             userEntity:target.userEntity ,
             isValidated:target.isValidated,
             registrationId:target.registrationId,
             id:target.id,
             validationDate:DateValueObject.create(new Date(target.validationDate)).getResult(),
          }
        ).getResult();
       
    }
    toPersistence (target: RegistrationEntity) :IRegistrationModel {
        return {
            registrationEmail:target.registrationEmail.value,
            registrationDate:target.registrationDate.value.toISOString(),
            registrationType:target.registrationType,
            userEntity:target.userEntity,
            validationCode:target.validationCode.value,
            id:target.id.toString(),
            expiryDate:target.expiryDate.value.toISOString(),
            registrationId:target.registrationId,
            isValidated:target.isValidated,
            validationDate:target.validationDate.value.toISOString()

        };
    }

}

