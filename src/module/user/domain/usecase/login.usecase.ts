import { AppError ,Either ,IUseCase ,Result, left, right ,DomainId ,UniqueEntityID ,IDomainService, IDefinition} from "@nana-tec/core";
import {IAuthService,JWTToken, RefreshToken,EUserStatus,EUserEntity,EUserSubtype ,EUserType,IIntergrationBroker ,DateValueObject ,PinValueObject ,IApiEventData} from "@nana-tec/core";
import BaseUseCase from '@nana-tec/core/lib/core/usecase/base-usecase.interface';
import {IUserRepo ,ILoginHistory} from '../repo/iuser.repo';
import UserEntity ,{ICreateUserProps } from '../entity/user.entity';
import {LoginError} from './login.error';
import {UserName} from  '../entity/username.entity'
import {UserPassword} from '../entity/userpassword.vo';


interface IloginDevice {
    device:string;
    deviceType:string;
    deviceVersion:string;
    deviceId:string;
    deviceUUID:string;
    rememberUser:boolean;
    applicationName:string;
    applicationVersion:string;
}
export interface ILoginDTO {

    username: string;
    password: string;
    loginDevice:IloginDevice;
}

const usecaseDetails:IDefinition =  {
   name: "LoginUser",
   version: "v1",
   description: "Usecase that handles User Login"
}


export interface LoginDTO {
  username: string;
  password: string;
}


interface ILoginUser {
   username: string;
   email: string;
   userId:string;
   entityId:string;
   entityUserRef:string;
   roles:string[];
   entity:string;
   userType:string;
   userSubType:string;
   loginId:string;
}

export interface LoginDTOResponse {
  refreshToken: RefreshToken;
  user:ILoginUser;
}


type Response = Either< 
  LoginError.InvalidCredentialsError | 
  AppError.UnexpectedError |
  Result<LoginDTOResponse> |
  Result<any>, 
  Result<void>
>
export default class LoginUseCase extends BaseUseCase implements IUseCase<ILoginDTO, Promise<Response>> 
{

   constructor (private userRepo:IUserRepo ,private authService: IAuthService,userDomainService:IDomainService,private intergrationBroker:IIntergrationBroker) {
        super(usecaseDetails,userDomainService)
   }
   async execute(request: ILoginDTO ): Promise<Response>  {
     try {
        const userExists = await this.userRepo.getUser(request.username);
        if(userExists.isFailure) {
            return left(new LoginError.InvalidCredentialsError())
         }

         const id=DomainId.create(); 
        const userEntity = userExists.getResult();

        const isPasswordValid= await userEntity.validatePassword(request.password);
         if(isPasswordValid.isFailure) {
            return left(new LoginError.InvalidCredentialsError())
         }
         if(!isPasswordValid.getResult()) {
            return left(new LoginError.InvalidCredentialsError())
         }

         // check if already logged in 
         // generate access token

         const loginHist:ILoginHistory = {
             userId: userEntity.userId,
             loginId: id.toString(),
             device: request.loginDevice.device,
             deviceType: request.loginDevice.deviceType,
             deviceVersion: request.loginDevice.deviceVersion,
             deviceId:request.loginDevice.deviceId,
             deviceUUID: request.loginDevice.deviceUUID,
             rememberUser: request.loginDevice.rememberUser,
             applicationName: request.loginDevice.applicationName,
             applicationVersion: request.loginDevice.applicationVersion,
             loginDate: new Date().toISOString()
         }

         await this.userRepo.saveLoginhistory(loginHist);

         const accessToken: JWTToken = this.authService.signJWT({
            username: userEntity.username.value,
            email: userEntity.email.value,
            userId:userEntity.userId,
            entityId:userEntity.entityId,
            entityUserRef:userEntity.entityUserRef
          });
          const refreshToken: RefreshToken = this.authService
          .createRefreshToken();
          userEntity.setAccessToken(accessToken, refreshToken); // later do away with this
        await this.authService.saveAuthenticatedUser(userEntity);
  
        return right(Result.ok<LoginDTOResponse>({
          refreshToken,
          user:{
            username: userEntity.username.value,
            email: userEntity.email.value,
            userId:userEntity.userId,
            entityId:userEntity.entity,
            entityUserRef:userEntity.entityUserRef,
            roles:userEntity.roles,
            entity:userEntity.entity,
            userType:userEntity.userType,
            userSubType:userEntity.userSubType ,
            loginId:id.toString()
          }
        })); 
  
     } catch (error) {
        console.error(error)
        return left(AppError.UnexpectedError.create(error))
     }
    }

}  