import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { CategoryCreateDto } from './Dto/CategoryCreateDto'

export class CategoryFacade extends FacadeContract {
  public async create(storeId: string, data: CategoryCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildCategoryCreateService(manager)
          .execute(storeId, data)
      })
  }

  public async getTree(ignoreCache?: boolean) {
    return this.serviceFactory
      .buildCategoryGetTreeService()
      .execute(ignoreCache)
  }

  public async getOneById(id: string) {
    return this.serviceFactory.buildCategoryGetOneByIdService().execute(id)
  }
}
