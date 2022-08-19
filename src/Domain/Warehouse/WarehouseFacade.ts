import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { WarehouseCreateDto } from './Dto/WarehouseCreateDto'
import { WarehouseGetListFilterDto } from './Dto/WarehouseGetListFilterDto'
import { WarehouseSavePriorityDto } from './Dto/WarehouseSavePriorityDto'

export class WarehouseFacade extends FacadeContract {
  public async create(storeId: string, data: WarehouseCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildWarehouseService(manager)
          .create(storeId, data)
      })
  }

  public async update(id: string, storeId: string, data: WarehouseCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildWarehouseService(manager)
          .update(id, storeId, data)
      })
  }

  public async updatePriorities(
    storeId: string,
    data: WarehouseSavePriorityDto[]
  ) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildWarehouseService(manager)
          .savePriorities(storeId, data)
      })
  }

  public async list(data: WarehouseGetListFilterDto) {
    return await this.serviceFactory.buildWarehouseService().list(data)
  }

  public async getOneById(id: string) {
    return await this.serviceFactory.buildWarehouseService().getOneById(id)
  }
}
