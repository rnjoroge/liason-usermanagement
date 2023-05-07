import { UseCaseError } from "@nana-tec/core"
import { Result } from "@nana-tec/core"


export namespace UserError {


    export class EntityUserNameExistsError extends Result<UseCaseError> {    
        constructor (message: string) {
          super(false, message,"UNPROCESSABLE_ENTITY" ,{
            message: message
          } as UseCaseError)
        }
    }

    export class UsernameError extends Result<UseCaseError> {    
        constructor (message: string) {
          super(false, message,"UNPROCESSABLE_ENTITY" ,{
            message: message
          } as UseCaseError)
        }
    }

    export class UserEntity extends Result<UseCaseError> {    
        constructor (message: string) {
          super(false, message,"UNPROCESSABLE_ENTITY" ,{
            message: message
          } as UseCaseError)
        }
    }

    export class PasswordError extends Result<UseCaseError> {    
        constructor (message: string) {
          super(false, message,"UNPROCESSABLE_ENTITY" ,{
            message: message
          } as UseCaseError)
        }
    }

    export class RegistrationPendingValidation extends Result<UseCaseError> {    
        constructor (regid: string) {
          super(false, `The registration id "${regid}" is pending validation.`,"UNPROCESSABLE_ENTITY" ,{
            message: `The registration id "${regid}" is pending validation.`
          } as UseCaseError)
        }
    }

    export class InvalidRegistrationId extends Result<UseCaseError> {    
        constructor (regid: string) {
          super(false, `The registration id "${regid}" is invalid.`,"UNPROCESSABLE_ENTITY" ,{
            message: `The registration id "${regid}" is invalid.`
          } as UseCaseError)
        }
    }

    export class InvalidUsername extends Result<UseCaseError> {    
        constructor (username: string) {
          super(false, `The username "${username}" is invalid.`,"UNPROCESSABLE_ENTITY" ,{
            message: `The username "${username}" is invalid.`
          } as UseCaseError)
        }
    }




}