import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { CategoryCreateDto } from './Dto/CategoryCreateDto'

export class CategoryFacade extends FacadeContract {
  public async create(storeId: string, data: CategoryCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildCategoryService(manager)
          .create(storeId, data)
      })
  }

  public async update(id: string, storeId: string, data: CategoryCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildCategoryService(manager)
          .update(id, storeId, data)
      })
  }

  public async getTree(ignoreCache?: boolean) {
    return this.serviceFactory.buildCategoryService().getTree(ignoreCache)
  }

  public async getOneById(id: string) {
    return this.serviceFactory.buildCategoryService().getOneById(id)
  }
}
