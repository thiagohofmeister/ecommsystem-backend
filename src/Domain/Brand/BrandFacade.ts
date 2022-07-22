import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { BrandCreateDto } from './Dto/BrandCreateDto'

export class BrandFacade extends FacadeContract {
  public async create(storeId: string, data: BrandCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        const BrandCreateService =
          this.serviceFactory.buildBrandCreateService(manager)

        return await BrandCreateService.execute(storeId, data)
      })
  }
}
