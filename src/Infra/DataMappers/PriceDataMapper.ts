import { EntityDataMapperContract } from 'ecommsystem-core'
import { Price } from '../../Domain/Product/Models/Price'
import { PriceDao } from '../Models/PriceDao'

export class PriceDataMapper extends EntityDataMapperContract<Price, PriceDao> {
  toDomainEntity(entity: PriceDao): Price {
    return new Price(
      entity.storeId,
      entity.list,
      entity.sale,
      entity.id,
      null,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Price): PriceDao {
    return new PriceDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getList(),
      domain.getSale(),
      domain.getCreatedAt()
    )
  }
}
