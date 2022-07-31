import { Warehouse } from '../Models/Warehouse'
import { WarehouseRepository } from '../Repositories/WarehouseRepository'

export class WarehouseGetOneByIdService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  public async execute(id: string): Promise<Warehouse> {
    return this.warehouseRepository.findOneByPrimaryColumn(id)
  }
}
