import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { AuthenticationCreateDto } from './Dto/AuthenticationCreateDto'
import { Authentication } from './Models/Authentication'

export class AuthenticationFacade extends FacadeContract {
  public async create(data: AuthenticationCreateDto): Promise<Authentication> {
    return await this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildAuthenticationService(manager)
          .create(data)
      })
  }
}
