import { IMapper, DomainId ,EmailValueObject,EUserSubtype ,EUserType,EUserStatus,DateValueObject,EUserEntity } from '@nana-tec/core';
import UserEntity from '../entity/user.entity';
import {IUserModel} from '../repo/iuser.repo';
import {UserName} from '../entity/username.entity';
import {UserPassword} from '../entity/userpassword.vo';

export default class UserMapper implements IMapper<UserEntity, IUserModel>{
    toDomain (target: IUserModel ) : UserEntity {
        //console.log(" == mapper result === ",target)
        return UserEntity.create(
          {
             ID:DomainId.create(target.id),
             email: EmailValueObject.create(target.email).getResult(),
             username: UserName.create({ name: target.username }).getResult(),
             password: UserPassword.create({ value: target.password }).getResult(),
             entity: EUserEntity[target.entityId],
             userType: EUserType[target.userType],
             userSubType: EUserSubtype[target.userSubType],
             userStatus: EUserStatus[target.userStatus],
             entityId: target.entityId,
             entityUserRef: target.entityUserRef,
             passwordTries: target.passwordTries,
             createdBy: target.createdBy,
             createdDate: DateValueObject.create(new Date(target.createdDate)).getResult(),
             roles: target.roles,
             userId: target.userId,
             passwordExpiryDate:DateValueObject.create(new Date(target.passwordExpiryDate)).getResult(),
             registrationId: target.registrationId,
             userAttributes: JSON.parse(target.userAttributes),
             twofactorEnabled: target.twofactorEnabled,
             accesstoken: target.accesstoken,
             isLoggedIn: target.isLoggedIn,
             statusName: target.statusName,
             loginId: target.loginId,
             lastLogin: DateValueObject.create().getResult()

          }
        ).getResult();
        }
        toPersistence (target: UserEntity) :IUserModel {
            return {
                email:target.email.value,
                username: target.username.value,
                password: target.password.value,
                entity:target.entity ,
                userType:target.userType,
                userSubType:target.userSubType,
                userStatus:target.userStatus,
                entityId:target.entityId,
                entityUserRef:target.entityUserRef,
                passwordTries:target.passwordTries,
                createdDate:target.createdDate.value.toISOString(),
                createdBy:target.createdBy,
                statusName:target.statusName,
                roles:target.roles,
                userId:target.userId,
                passwordExpiryDate:target.passwordExpiryDate.value.toISOString(),
                isLoggedIn:target.isLoggedIn,
                loginId:target.loginId,
                registrationId:target.registrationId,
                userAttributes:JSON.stringify(target.userAttributes),
                twofactorEnabled:target.twofactorEnabled,
                accesstoken:target.accesstoken,
                lastLogin: target.lastLogin.value.toISOString(),
                id:target.id.toString()
    
            };
        }

}