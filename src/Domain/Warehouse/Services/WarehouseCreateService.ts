import { WarehouseValidator } from '../WarehouseValidator'
import { WarehouseCreateDto } from '../Dto/WarehouseCreateDto'
import { Warehouse } from '../Models/Warehouse'
import { WarehouseSaveService } from './WarehouseSaveService'

export class WarehouseCreateService {
  constructor(
    private readonly warehouseSaveService: WarehouseSaveService,
    private readonly warehouseValidator: WarehouseValidator
  ) {}

  public async execute(
    storeId: string,
    data: WarehouseCreateDto
  ): Promise<Warehouse> {
    await this.warehouseValidator.warehouseCreatePayloadValidate(data)

    return this.warehouseSaveService.execute(storeId, data)
  }
}
