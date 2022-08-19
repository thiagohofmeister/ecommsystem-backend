import { EntityDataMapperContract } from 'ecommsystem-core'
import { WarehouseDao } from '../Models/WarehouseDao'
import { Warehouse } from '../../Domain/Warehouse/Models/Warehouse'

export class WarehouseDataMapper extends EntityDataMapperContract<
  Warehouse,
  WarehouseDao
> {
  toDomainEntity(entity: WarehouseDao): Warehouse {
    return new Warehouse(
      entity.storeId,
      entity.name,
      entity.addressZipCode,
      entity.addressState,
      entity.addressCity,
      entity.addressDistrict,
      entity.addressStreet,
      entity.addressNumber,
      entity.addressComplement,
      entity.priority,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Warehouse): WarehouseDao {
    return new WarehouseDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getName(),
      domain.getAddressZipCode(),
      domain.getAddressState(),
      domain.getAddressCity(),
      domain.getAddressDistrict(),
      domain.getAddressStreet(),
      domain.getAddressNumber(),
      domain.getAddressComplement(),
      domain.getPriority(),
      domain.getCreatedAt(),
      domain.getUpdatedAt()
    )
  }
}
