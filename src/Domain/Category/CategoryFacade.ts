import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { CategoryCreateDto } from './Dto/CategoryCreateDto'

export class CategoryFacade extends FacadeContract {
  public async create(storeId: string, data: CategoryCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        const categoryCreateService =
          this.serviceFactory.buildCategoryCreateService(manager)

        return await categoryCreateService.execute(storeId, data)
      })
  }

  public async getTree(ignoreCache?: boolean) {
    const categoryCreateService =
      this.serviceFactory.buildCategoryGetTreeService()

    return categoryCreateService.execute(ignoreCache)
  }
}
