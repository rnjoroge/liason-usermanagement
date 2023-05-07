import { UseCaseError } from "@nana-tec/core"
import { Result } from "@nana-tec/core"


export namespace RegistrationError {

    export class InvalidEmail extends Result<UseCaseError> {    
        constructor (email: string) {
          super(false, `The email "${email}" is invalid.`,"UNPROCESSABLE_ENTITY" ,{
            message: `The email "${email}" is invalid.`
          } as UseCaseError)
        }
    }


    export class RegistrationValidationError extends Result<UseCaseError> {    
        constructor (message: string) {
          super(false, message,"UNPROCESSABLE_ENTITY" ,{
            message: message
          } as UseCaseError)
        }
    }




}