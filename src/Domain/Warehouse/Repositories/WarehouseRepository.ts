import { IRepository } from 'ecommsystem-core'
import { Warehouse } from '../Models/Warehouse'

export interface WarehouseRepository extends IRepository<Warehouse> {
  findByZipCodeAndNumber(zipCode: string, number: string): Promise<Warehouse>
  findByIds(ids: string[]): Promise<Warehouse[]>
  getNextPriority(): Promise<number>
}
