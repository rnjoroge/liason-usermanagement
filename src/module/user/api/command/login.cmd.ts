

import { apiType, api,Result ,apiResponse ,ICommandApiResponse,ICommandApiRequest,IApiService, IAPIRequest} from '@nana-tec/core';
import LoginUseCase ,{ILoginDTO} from '../../domain/usecase/login.usecase';


export default class LoginUserApi extends api {

    constructor (private loginUseCase:LoginUseCase ,apiService:IApiService) {
        super({
         name:"login",
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
        const resp = await this.loginUseCase.execute(request.getData<ILoginDTO>() );
        const value = resp.value;
        if(resp.isLeft()) {
          return Result.fail(value.error)
        }
        return Result.ok(value.getResult());
    }

}