import { Warehouse } from '../../Domain/Warehouse/Models/Warehouse'
import { WarehouseRepository } from '../../Domain/Warehouse/Repositories/WarehouseRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { WarehouseDao } from '../Models/WarehouseDao'
import { In, SelectQueryBuilder } from 'typeorm'
import { IFilterDefault } from '../../Core/Models/Interfaces/IFilterDefault'

export class WarehouseRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Warehouse, WarehouseDao>
  implements WarehouseRepository
{
  async findByIds(ids: string[]): Promise<Warehouse[]> {
    const warehouses = await this.repository
      .createQueryBuilder()
      .where({
        storeId: this.storeId,
        id: In(ids)
      })
      .getMany()

    return this.dataMapper.toDomainEntityMany(warehouses)
  }

  async getNextPriority(): Promise<number> {
    const last = (
      await this.repository.find({
        order: { priority: 'desc' },
        take: 1
      })
    )[0]

    if (!last) {
      return 0
    }

    return last.priority + 1
  }

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

  protected customToFindAll(
    filter: IFilterDefault,
    query: SelectQueryBuilder<WarehouseDao>
  ): SelectQueryBuilder<WarehouseDao> {
    return query.orderBy('priority', 'ASC')
  }
}
