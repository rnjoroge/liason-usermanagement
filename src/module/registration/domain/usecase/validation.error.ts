import { UseCaseError } from "@nana-tec/core"
import { Result } from "@nana-tec/core"

export namespace ValidationUsecaseError {


    export class InvalidRegistrationId extends Result<UseCaseError> {    
        constructor (regid: string) {
          super(false, `The registration id "${regid}" is invalid.`,"UNPROCESSABLE_ENTITY" ,{
            message: `The registration id "${regid}" is invalid.`
          } as UseCaseError)
        }
    }

    export class CodeExpired extends Result<UseCaseError> {    
        constructor (code: string) {
          super(false, `The validation code "${code}" has expired .`,"UNPROCESSABLE_ENTITY" ,{
            message: `The validation code "${code}" has expired .`
          } as UseCaseError)
        }
    }

    export class InvalidRegistration extends Result<UseCaseError> {    
        constructor (message: string) {
          super(false, message,"UNPROCESSABLE_ENTITY" ,{
            message: message
          } as UseCaseError)
        }
    }

}