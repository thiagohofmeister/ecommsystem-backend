import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'
import { Variation } from '../../Domain/Product/Models/Variation'
import { VariationDao } from '../Models/VariationDao'

export class VariationDataMapper extends EntityDataMapperContract<
  Variation,
  VariationDao
> {
  toDomainEntity(entity: VariationDao): Variation {
    return new Variation(
      entity.sku,
      entity.storeId,
      entity.width,
      entity.length,
      entity.height,
      entity.weight,
      entity.measuresUnit,
      entity.weightUnit
    )
  }

  toDaoEntity(domain: Variation): VariationDao {
    return new VariationDao(
      domain.getSku(),
      domain.getStoreId(),
      domain.getWidth(),
      domain.getLength(),
      domain.getHeight(),
      domain.getWeight(),
      domain.getMeasuresUnit(),
      domain.getWeightUnit()
    )
  }
}
