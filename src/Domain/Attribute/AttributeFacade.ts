import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { AttributeCreateDto } from './Dto/AttributeCreateDto'
import { AttributeGetListFilterDto } from './Dto/AttributeGetListFilterDto'

export class AttributeFacade extends FacadeContract {
  public async create(storeId: string, data: AttributeCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildAttributeService(manager)
          .create(storeId, data)
      })
  }

  public async update(id: string, storeId: string, data: AttributeCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildAttributeService(manager)
          .update(id, storeId, data)
      })
  }

  public async list(data: AttributeGetListFilterDto) {
    return await this.serviceFactory.buildAttributeService().list(data)
  }

  public async getOneById(id: string) {
    return await this.serviceFactory.buildAttributeService().getOneById(id)
  }
}
