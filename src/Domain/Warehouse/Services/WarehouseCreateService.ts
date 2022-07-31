import { WarehouseValidator } from '../WarehouseValidator'
import { WarehouseCreateDto } from '../Dto/WarehouseCreateDto'
import { Warehouse } from '../Models/Warehouse'
import { WarehouseSaveService } from './WarehouseSaveService'
import { WarehouseRepository } from '../Repositories/WarehouseRepository'
import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { WarehouseConflict } from '../Exceptions/WarehouseConflict'

export class WarehouseCreateService {
  constructor(
    private readonly warehouseRepository: WarehouseRepository,
    private readonly warehouseSaveService: WarehouseSaveService,
    private readonly warehouseValidator: WarehouseValidator
  ) {}

  public async execute(
    storeId: string,
    data: WarehouseCreateDto
  ): Promise<Warehouse> {
    await this.validateWarehouseAlreadyExists(
      data.address.zipCode,
      data.address.number
    )

    await this.warehouseValidator.warehouseCreatePayloadValidate(data)

    return this.warehouseSaveService.execute(storeId, data)
  }

  private async validateWarehouseAlreadyExists(
    zipCode: string,
    number: string
  ) {
    let exists = false

    try {
      await this.warehouseRepository.findByZipCodeAndNumber(zipCode, number)
      exists = true
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    if (exists) throw new WarehouseConflict()
  }
}
