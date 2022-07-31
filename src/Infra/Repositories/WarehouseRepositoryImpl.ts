import { Warehouse } from '../../Domain/Warehouse/Models/Warehouse'
import { WarehouseRepository } from '../../Domain/Warehouse/Repositories/WarehouseRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { WarehouseDao } from '../Models/WarehouseDao'

export class WarehouseRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Warehouse, WarehouseDao>
  implements WarehouseRepository {}
