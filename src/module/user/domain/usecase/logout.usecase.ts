import { AppError ,Either ,IUseCase ,Result, right,left ,IDomainService, IDefinition} from "@nana-tec/core";
import {IAuthService,IIntergrationBroker } from "@nana-tec/core";
import BaseUseCase from '@nana-tec/core/lib/core/usecase/base-usecase.interface';
import {IUserRepo } from '../repo/iuser.repo';
import UserEntity ,{ICreateUserProps } from '../entity/user.entity';
import {LoginError} from './login.error';

export interface ILogoutDTO {
    userid: string;
}

const usecaseDetails:IDefinition =  {
    name: "LoginOut",
    version: "v1",
    description: "Usecase that handles User Logout"
}

type Response = Either< 
   LoginError.UserNotFoundOrDeletedError | 
  Result<any>, 
  Result<void>
>

export default class LogoutUseCase extends BaseUseCase implements IUseCase<ILogoutDTO, Promise<Response>> 
{

   constructor (private userRepo:IUserRepo ,private authService: IAuthService,userDomainService:IDomainService,private intergrationBroker:IIntergrationBroker) {
        super(usecaseDetails,userDomainService)
   }

  async  execute(request: ILogoutDTO ): Promise<Response> {
      try {
        const userExists = await this.userRepo.getUserByUserid(request.userid);
        if(userExists.isFailure) {
            return left(new LoginError.UserNotFoundOrDeletedError(request.userid))
         }
         const user =userExists.getResult();

         await this.authService.deAuthenticateUser(user.username.value);
         return right(Result.success()) as Response;   
      } catch (error) {
        console.error(error)
        return left(AppError.UnexpectedError.create(error))
      }
    }

}  