import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { BrandCreateDto } from './Dto/BrandCreateDto'
import { BrandGetListFilterDto } from './Dto/BrandGetListFilterDto'

export class BrandFacade extends FacadeContract {
  public async create(storeId: string, data: BrandCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        const brandCreateService =
          this.serviceFactory.buildBrandCreateService(manager)

        return await brandCreateService.execute(storeId, data)
      })
  }

  public async list(data: BrandGetListFilterDto) {
    const brandGetListService = this.serviceFactory.buildBrandGetListService()

    return await brandGetListService.execute(data)
  }

  public async getOneById(id: string) {
    const brandGetOneByIdService =
      this.serviceFactory.buildBrandGetOneByIdService()

    return await brandGetOneByIdService.execute(id)
  }
}
