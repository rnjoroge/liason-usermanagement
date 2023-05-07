
import UserEntity from '../entity/user.entity';
import {EUserEntity,EUserStatus,EUserSubtype ,EUserType, Result} from "@nana-tec/core";


export interface IUserModel  {
    email: string;
    username: string;
    password: string;
    entity:EUserEntity ;
    userType:EUserType;
    userSubType:EUserSubtype;
    userStatus:EUserStatus;
    entityId:string;
    entityUserRef:string;
    passwordTries:number;
    createdDate:string;
    createdBy:string,
    statusName:string;
    roles:string[];
    userId:string;
    passwordExpiryDate:string;
    isLoggedIn:boolean;
    loginId:string;
    registrationId:string;
    userAttributes:string;
    twofactorEnabled:boolean;
    accesstoken:string;
  //  accessToken?: JWTToken;
  //  refreshToken?: RefreshToken;
    lastLogin: string;
    id:string;
}



export interface ILoginHistory {
  userId:string;
  loginId:string;
  device:string;
  deviceType:string;
  deviceVersion:string;
  deviceId:string;
  deviceUUID:string;
  rememberUser:boolean;
  applicationName:string;
  applicationVersion:string;
  loginDate:string;
}

export interface IUserRepo {

   entityUsernameExists (username:string):Promise<Result<boolean>>;
   saveUser(user:UserEntity):Promise<Result<void>>;
   getUser(username:string):Promise<Result<UserEntity>>;
   getUserByUserid(userid:string):Promise<Result<UserEntity>>;
   saveLoginhistory(loginHistory:ILoginHistory) :Promise<Result<void>>;
   getloginHistory(loginId:string):Promise<Result<ILoginHistory>>;
}