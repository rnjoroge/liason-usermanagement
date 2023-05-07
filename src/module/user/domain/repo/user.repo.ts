import {IBaseConnection ,BaseRepository,IrepoDetails, Result ,IMapper, EUserEntity } from '@nana-tec/core';
import {IUserRepo ,IUserModel, ILoginHistory} from './iuser.repo';
import UserEntity from '../entity/user.entity';


const UserRepoDetails:IrepoDetails={
    collectionName: 'users'
}
// will chnage this later
const UserLoginHistoryRepoDetails:IrepoDetails={
    collectionName: 'userloginhistory'
}


export default class UserRepo extends BaseRepository <UserEntity,IUserModel> implements IUserRepo {

    constructor (
        readonly database: IBaseConnection<any> ,
        readonly mapper: IMapper<UserEntity,IUserModel> ,
     ) {
       super(database,mapper,UserRepoDetails);
     }
 async getUserByUserid(userid: string): Promise<Result<UserEntity>> {
    try {
      const UserEntity= await this.findOne({userId:userid});
      if(!UserEntity) {
          return Result.fail<any>(" Invalid Userid ");
      }
      return Result.ok<any>(UserEntity);     
    }
    catch (err) {
        return Result.fail<any>(err.message);
    }
  }


 async saveLoginhistory(loginHistory: ILoginHistory): Promise<Result<void>> {
    try {
      return this.database.insert(UserLoginHistoryRepoDetails,loginHistory);
  }
  catch (err) {
      return Result.fail<any>(err.message);
  }
  }
  async getloginHistory(loginId: string): Promise<Result<ILoginHistory>> {
      try {
           const loginHist= await this.database.findOne(UserLoginHistoryRepoDetails,{loginId:loginId});
           if(!loginHist) {
            return Result.fail(`Invalid LoginId ${loginId} `)
           }

           return Result.ok(loginHist as ILoginHistory);
        }
        catch (err) {
            return Result.fail<any>(err.message);
        }
  }
  async getUser(username: string): Promise<Result<UserEntity>> {
    try {
      const UserEntity= await this.findOne({username:username});
      if(!UserEntity) {
          return Result.fail<any>(" Invalid Username ");
      }
      return Result.ok<any>(UserEntity);     
  }
  catch (err) {
      return Result.fail<any>(err.message);
  }
  }
   async saveUser(user: UserEntity): Promise<Result<void>> {
      try {
        await this.save(user);
        return Result.success();
      } catch (error) {
        return Result.fail<any>(error.message);
      }
    }

   async entityUsernameExists( username: string): Promise<Result<boolean>> {
       try {
        const UserEntity= await this.findOne({username:username});
        if(UserEntity) {
            return Result.ok<boolean>(true); 
        }
        return Result.ok<boolean>(false); 
       } catch (error) {
        console.error(error)
        return Result.fail<any>(error.message);
       }
    }

}