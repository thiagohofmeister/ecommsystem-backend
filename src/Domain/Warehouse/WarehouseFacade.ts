import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { WarehouseCreateDto } from './Dto/WarehouseCreateDto'
import { WarehouseGetListFilterDto } from './Dto/WarehouseGetListFilterDto'

export class WarehouseFacade extends FacadeContract {
  public async create(storeId: string, data: WarehouseCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildWarehouseCreateService(manager)
          .execute(storeId, data)
      })
  }

  public async update(id: string, storeId: string, data: WarehouseCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildWarehouseUpdateService(manager)
          .execute(id, storeId, data)
      })
  }

  public async list(data: WarehouseGetListFilterDto) {
    return await this.serviceFactory
      .buildWarehouseGetListService()
      .execute(data)
  }

  public async getOneById(id: string) {
    return await this.serviceFactory
      .buildWarehouseGetOneByIdService()
      .execute(id)
  }
}
