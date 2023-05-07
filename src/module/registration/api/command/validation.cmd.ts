import { apiType, api,Result ,apiResponse ,ICommandApiResponse,ICommandApiRequest,IApiService, IAPIRequest} from '@nana-tec/core';
import ValidateRegistrationUseCase ,{IRegistrationValidationDTO} from '../../domain/usecase/validate.usecase';


export default class RegistrationValidationApi extends api {

    constructor (private validateRegistrationUseCase:ValidateRegistrationUseCase ,apiService:IApiService) {
        super({
         name:"validateRegistration",
         version:"v1",
         description:" Api for validating a Registration"
        },apiType.command,apiService)
        //this.init()
     }
     init() {
        // console.log(" === Doing registration of command api ====")
        // this.registerApi()
        }
   async  handler(request: IAPIRequest): Promise<Result<apiResponse<any>>> {
        const resp = await this.validateRegistrationUseCase.execute(request.getData<IRegistrationValidationDTO>() );

        const value = resp.value;
        if(resp.isLeft()) {
          return Result.fail(value.errorValue())
        }
        return Result.ok(value.getResult());
    }

}