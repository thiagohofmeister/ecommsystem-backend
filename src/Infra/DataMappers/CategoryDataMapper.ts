import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'
import { CategoryDao } from '../Models/CategoryDao'
import { Category } from '../../Category/Models/Category'

export class CategoryDataMapper extends EntityDataMapperContract<
  Category,
  CategoryDao
> {
  toDomainEntity(entity: CategoryDao): Category {
    return new Category(
      entity.storeId,
      entity.label,
      entity.urn,
      entity.description,
      entity.parent ? this.toDomainEntity(entity.parent) : null,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Category): CategoryDao {
    return new CategoryDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getLabel(),
      domain.getUrn(),
      domain.getDescription(),
      domain.getCreatedAt(),
      domain.getParent() ? this.toDaoEntity(domain.getParent()) : null
    )
  }
}
