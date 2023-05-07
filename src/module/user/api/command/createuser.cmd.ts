import { apiType, api,Result ,apiResponse ,ICommandApiResponse,ICommandApiRequest,IApiService, IAPIRequest} from '@nana-tec/core';
import CreateUserUseCase ,{ICreateUserDTO} from '../../domain/usecase/createuser.usecase';


export default class CreateUserApi extends api {

    constructor (private createUserUseCase:CreateUserUseCase ,apiService:IApiService) {
        super({
         name:"createUser",
         version:"v1",
         description:" Api for creating a User"
        },apiType.command,apiService)
        //this.init()
     }
     init() {
        // console.log(" === Doing registration of command api ====")
        // this.registerApi()
        }
   async  handler(request: IAPIRequest): Promise<Result<apiResponse<any>>> {
        const resp = await this.createUserUseCase.execute(request.getData<ICreateUserDTO>() );
        const value = resp.value;
        if(resp.isLeft()) {
          return Result.fail(value.error)
        }
        return Result.ok(value.getResult());
    }

}