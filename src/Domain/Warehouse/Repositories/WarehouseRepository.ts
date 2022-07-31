import { IRepository } from '../../../Core/Models/Interfaces/IRepository'
import { Warehouse } from '../Models/Warehouse'

export interface WarehouseRepository extends IRepository<Warehouse> {
  findByZipCodeAndNumber(zipCode: string, number: string): Promise<Warehouse>
}
