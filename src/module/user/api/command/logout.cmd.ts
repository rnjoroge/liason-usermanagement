
import { apiType, api,Result ,apiResponse ,ICommandApiResponse,ICommandApiRequest,IApiService, IAPIRequest} from '@nana-tec/core';
import LogoutUseCase ,{ILogoutDTO} from '../../domain/usecase/logout.usecase';


export default class LogoutUserApi extends api {

    constructor (private logoutUseCase:LogoutUseCase ,apiService:IApiService) {
        super({
         name:"logout",
         version:"v1",
         description:" Api for Logout"
        },apiType.command,apiService)
        //this.init()
     }
     init() {
        // console.log(" === Doing registration of command api ====")
        // this.registerApi()
        }
   async  handler(request: IAPIRequest): Promise<Result<apiResponse<any>>> {
        const resp = await this.logoutUseCase.execute(request.getData<ILogoutDTO>() );
        const value = resp.value;
        if(resp.isLeft()) {
          return Result.fail(value.error)
        }
        return Result.ok(value.getResult());
    }

}