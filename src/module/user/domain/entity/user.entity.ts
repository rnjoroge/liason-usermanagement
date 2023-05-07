import { AggregateRoot,DomainId  ,Result ,UniqueEntityID ,Guard ,BaseDomainEntity, IDefinition } from "@nana-tec/core";
import {EmailValueObject,JWTToken,RefreshToken,EUserEntity,EUserStatus,EUserSubtype ,EUserType,DateValueObject ,PinValueObject} from "@nana-tec/core";

import {UserName} from './username.entity';
import {UserPassword} from './userpassword.vo';

export interface IUserProps  extends BaseDomainEntity{
    email: EmailValueObject;
    username: UserName;
    password: UserPassword;
    entity:EUserEntity ;
    userType:EUserType;
    userSubType:EUserSubtype;
    userStatus:EUserStatus;
    entityId:string;
    entityUserRef:string;
    passwordTries:number;
    createdDate:DateValueObject;
    createdBy:string,
    statusName:string;
    roles:string[];
    userId:string;
    passwordExpiryDate:DateValueObject;
    isLoggedIn:boolean;
    loginId:string;
    registrationId:string;
    userAttributes:{ [key: string]: string | number };
    twofactorEnabled:boolean;
    accesstoken:string;
    accessToken?: JWTToken;
   refreshToken?: RefreshToken;
    lastLogin: DateValueObject;
}

export const UserAggregateDefinition:IDefinition= {
  name:"user",
  version:"v1",
  description:"User entity"
}


export interface ICreateUserProps {
  email: EmailValueObject;
  username: UserName;
  password: UserPassword;
  entity:EUserEntity ;
  userType:EUserType;
  userSubType:EUserSubtype;
  entityId:string;
  entityUserRef:string;
  userId:string;
  registrationId:string;
  createdDate:DateValueObject;
  createdBy:string,
}

export default class UserEntity extends AggregateRoot<IUserProps>  {

  get email () :EmailValueObject{
    return this.props.email;
  }
  get username () :UserName{
    return this.props.username;
  }
  get password () :UserPassword{
    return this.props.password;
  }
  get entity () :EUserEntity{
    return this.props.entity;
  }
  get userType () :EUserType{
    return this.props.userType;
  }
  get userSubType () :EUserSubtype{
    return this.props.userSubType;
  }
  get userStatus () :EUserStatus{
    return this.props.userStatus;
  }
  get entityId () :string{
    return this.props.entityId;
  }
  get entityUserRef () :string{
    return this.props.entityUserRef;
  }
  get passwordTries () :number{
    return this.props.passwordTries;
  }
  get createdBy () :string{
    return this.props.createdBy;
  }
  get createdDate () :DateValueObject{
    return this.props.createdDate;
  }
  
  get roles () :string[]{
    return this.props.roles;
  }
  get statusName () :string{
    return this.props.statusName;
  }
  get userId () :string{
    return this.props.userId;
  }
  get passwordExpiryDate () :DateValueObject{
    return this.props.passwordExpiryDate;
  } 
  get isLoggedIn () :boolean{
    return this.props.isLoggedIn;
  } 
  get loginId () :string{
    return this.props.loginId;
  } 
  get registrationId () :string{
    return this.props.registrationId;
  } 
  get userAttributes () :{ [key: string]: string | number }{
    return this.props.userAttributes;
  } 
  get twofactorEnabled () :boolean{
    return this.props.twofactorEnabled;
  } 
  get lastLogin () :DateValueObject{
    return this.props.lastLogin;
  } 
  get accesstoken () :string{
    return this.props.accesstoken;
  } 

  

  private constructor (props: IUserProps, id?: UniqueEntityID) {
		super(props,UserAggregateDefinition );
	}

  public alreadyLoggedIn (): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken
  }

  public static create (props: IUserProps, id?: UniqueEntityID):Result<UserEntity>{
    const registrationEntity =new UserEntity(props,id);
    return Result.ok(registrationEntity);
  }

  public static createUser (props: ICreateUserProps, id?: UniqueEntityID):Result<UserEntity>{

    const guardedProps = [
      { argument: props.email, argumentName: 'Email Required' },
      { argument: props.username, argumentName: 'Username Required' } ,
      { argument: props.password, argumentName: 'Password Required' } ,
      { argument: props.userType, argumentName: 'UserType Required' } ,
      { argument: props.userSubType, argumentName: 'userSubtype Required' } ,
      { argument: props.entity, argumentName: 'User Entity Required' } ,
      { argument: props.createdBy, argumentName: 'CreatedBy Required' } ,
      { argument: props.entityUserRef, argumentName: 'EntityUserRef Required' } ,
      { argument: props.registrationId, argumentName: 'RegistrationId Required' } ,
      
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
          return Result.fail<UserEntity>(guardResult.message || 'Props validation error')
    } 

    const userProps:IUserProps= {
      email: props.email,
      username: props.username,
      password: props.password,
      entity: props.entity,
      userType: props.userType,
      userSubType: props.userSubType,
      userStatus: EUserStatus.active,
      entityId: props.entityId,
      entityUserRef: props.entityUserRef,
      passwordTries: 0,
      createdBy: props.createdBy,
      createdDate: DateValueObject.create().getResult(),
      roles: [],
      userId: props.userId,
      passwordExpiryDate: DateValueObject.create().getResult(),
      registrationId: props.registrationId,
      userAttributes: {},
      twofactorEnabled: false,
      accesstoken: "",
      isLoggedIn: false,
      ID: DomainId.create(),
      statusName: "Active",
      loginId: "",
      lastLogin: DateValueObject.create().getResult()
    }
    const registrationEntity =new UserEntity(userProps,id);
    registrationEntity.addDomainEvent("userCreated",registrationEntity.toObject(),{},"v1");
    return Result.ok(registrationEntity);
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = DateValueObject.create().getResult()

    // domain event logged in
  }

  public async validatePassword (password: string) :Promise<Result<boolean>>{

    const passwordvalid=await this.password.comparePassword(password)
     if(passwordvalid) {
      return Result.ok(true);
     }
     return Result.ok(false);
  }




}