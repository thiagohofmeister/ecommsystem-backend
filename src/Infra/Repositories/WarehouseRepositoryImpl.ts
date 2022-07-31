import { Warehouse } from '../../Domain/Warehouse/Models/Warehouse'
import { WarehouseRepository } from '../../Domain/Warehouse/Repositories/WarehouseRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { WarehouseDao } from '../Models/WarehouseDao'

export class WarehouseRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Warehouse, WarehouseDao>
  implements WarehouseRepository
{
  async findByZipCodeAndNumber(
    addressZipCode: string,
    addressNumber: string
  ): Promise<Warehouse> {
    const warehouse = await this.repository
      .createQueryBuilder()
      .where({
        storeId: this.storeId,
        addressZipCode,
        addressNumber
      })
      .getOne()

    if (!warehouse) {
      throw this.dataNotFoundException
    }

    return this.dataMapper.toDomainEntity(warehouse)
  }
}
