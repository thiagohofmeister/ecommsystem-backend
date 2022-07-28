import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { BrandCreateDto } from './Dto/BrandCreateDto'
import { BrandGetListFilterDto } from './Dto/BrandGetListFilterDto'

export class BrandFacade extends FacadeContract {
  public async create(storeId: string, data: BrandCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildBrandCreateService(manager)
          .execute(storeId, data)
      })
  }

  public async update(id: string, storeId: string, data: BrandCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildBrandUpdateService(manager)
          .execute(id, storeId, data)
      })
  }

  public async list(data: BrandGetListFilterDto) {
    return await this.serviceFactory.buildBrandGetListService().execute(data)
  }

  public async getOneById(id: string) {
    return await this.serviceFactory.buildBrandGetOneByIdService().execute(id)
  }
}
