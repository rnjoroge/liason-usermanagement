import { UseCaseError } from "@nana-tec/core"
import { Result } from "@nana-tec/core"


export namespace LoginError {

    export class InvalidCredentialsError extends Result<UseCaseError> {    
        constructor () {
          super(false, "Invalid User Credentials","UNPROCESSABLE_ENTITY" ,{
            message: "Invalid User Credentials"
          } as UseCaseError)
        }
    }

    export class UserNotFoundOrDeletedError extends Result<UseCaseError> {    
        constructor (userid) {
          super(false, `UserNot Found "${userid}" or is invalid`,"UNPROCESSABLE_ENTITY" ,{
            message:  `UserNot Found "${userid}" or is invalid`
          } as UseCaseError)
        }
    }

    

}