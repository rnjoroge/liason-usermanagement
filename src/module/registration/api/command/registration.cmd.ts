import { apiType, api,Result ,apiResponse ,ICommandApiResponse,ICommandApiRequest,IApiService, IAPIRequest} from '@nana-tec/core';
import CreateRegistrationUseCase ,{ICreateRegistrationDTO} from '../../domain/usecase/create.usecase';


export default class CreateRegistrationApi extends api {

    constructor (private createProviderUseCase:CreateRegistrationUseCase ,apiService:IApiService) {
        super({
         name:"createRegistration",
         version:"v1",
         description:" Api for creating a Registration"
        },apiType.command,apiService)
        //this.init()
     }
     init() {
        // console.log(" === Doing registration of command api ====")
        // this.registerApi()
        }
   async  handler(request: IAPIRequest): Promise<Result<apiResponse<any>>> {
        const resp = await this.createProviderUseCase.execute(request.getData<ICreateRegistrationDTO>() );
        const value = resp.value;
        if(resp.isLeft()) {
          return Result.fail(value.error)
        }
        return Result.ok(value.getResult());
    }

}