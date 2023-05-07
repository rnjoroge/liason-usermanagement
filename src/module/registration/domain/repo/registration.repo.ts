import {IBaseConnection ,BaseRepository,IrepoDetails, Result ,IMapper } from '@nana-tec/core';
import {IRegistrationRepo ,IRegistrationModel} from './iregistration.repo';
import RegistrationEntity from '../entity/registration.entity';


const RegistrationRepoDetails:IrepoDetails={
    collectionName: 'registration'
}
// will chnage this later
const RegistrationViewRepoDetails:IrepoDetails={
    collectionName: 'registrationview'
}

export default class RegistrationRepo extends BaseRepository <RegistrationEntity,IRegistrationModel> implements IRegistrationRepo {
  
     constructor (
        readonly database: IBaseConnection<any> ,
        readonly mapper: IMapper<RegistrationEntity,IRegistrationModel> ,
     ) {
       super(database,mapper,RegistrationRepoDetails);
     }


   async saveRegistration(registration: RegistrationEntity): Promise<Result<void>> {
    try {
        await this.save(registration);
        return Result.success(); 
    } catch (error) {
        return Result.fail<any>(error.message);
    }

    }

   async updateRegistration(registration: RegistrationEntity): Promise<Result<void, string>> {
    try {
        await this.update(registration);
        return Result.success(); 
    } catch (error) {
        return Result.fail<any>(error.message);
    }
  }
    
    async getRegistration(registrationId: string): Promise<Result<RegistrationEntity>> {
        try {
            const RegistrationEntity= await this.findOne({registrationId:registrationId});
            if(!RegistrationEntity) {
                return Result.fail<any>(" Invalid Registration ");
            }
            return Result.ok<any>(RegistrationEntity);     
        }
        catch (err) {
            return Result.fail<any>(err.message);
        }
    }
    async  saveViewData(data: any): Promise<Result<void>> {
        try {
            return this.database.insert(RegistrationViewRepoDetails,data);
        }
        catch (err) {
            return Result.fail<any>(err.message);
        }
     }
    
}
