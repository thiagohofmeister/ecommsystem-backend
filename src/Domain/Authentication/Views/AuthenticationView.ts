import { ViewContract } from 'ecommsystem-core'

import { Authentication } from '../Models/Authentication'

export class AuthenticationView extends ViewContract<
  Authentication,
  AuthenticationResponse
> {
  protected renderOne(entity: Authentication): AuthenticationResponse {
    return {
      authToken: entity.getAuthToken()
    }
  }
}

export interface AuthenticationResponse {
  authToken: string
}
