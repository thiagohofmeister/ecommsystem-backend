import { IItemListModel } from '../../../Core/Models/Interfaces/IItemListModel'
import { WarehouseGetListFilterDto } from '../Dto/WarehouseGetListFilterDto'
import { Warehouse } from '../Models/Warehouse'
import { WarehouseRepository } from '../Repositories/WarehouseRepository'

export class WarehouseGetListService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  public async execute(
    filter: WarehouseGetListFilterDto
  ): Promise<IItemListModel<Warehouse>> {
    return this.warehouseRepository.findAll(filter)
  }
}
