import { WarehouseValidator } from '../WarehouseValidator'
import { WarehouseUpdateDto } from '../Dto/WarehouseUpdateDto'
import { Warehouse } from '../Models/Warehouse'
import { WarehouseGetOneByIdService } from './WarehouseGetOneByIdService'
import { WarehouseSaveService } from './WarehouseSaveService'

export class WarehouseUpdateService {
  constructor(
    private readonly warehouseSaveService: WarehouseSaveService,
    private readonly warehouseGetOneByIdService: WarehouseGetOneByIdService,
    private readonly warehouseValidator: WarehouseValidator
  ) {}

  public async execute(
    id: string,
    storeId: string,
    data: WarehouseUpdateDto
  ): Promise<Warehouse> {
    await this.warehouseValidator.warehouseUpdatePayloadValidate(data)

    return this.warehouseSaveService.execute(
      storeId,
      data,
      await this.warehouseGetOneByIdService.execute(id)
    )
  }
}
