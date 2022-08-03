import { WarehouseSaveDto } from '../Dto/WarehouseSaveDto'
import { Warehouse } from '../Models/Warehouse'
import { WarehouseRepository } from '../Repositories/WarehouseRepository'

export class WarehouseSaveService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  public async execute(
    storeId: string,
    data: WarehouseSaveDto,
    warehouse?: Warehouse
  ): Promise<Warehouse> {
    const warehouseToSave = await this.getWarehouseToSave(
      storeId,
      data,
      warehouse
    )

    return await this.warehouseRepository.save(warehouseToSave)
  }

  private async getWarehouseToSave(
    storeId: string,
    data: WarehouseSaveDto,
    warehouse?: Warehouse
  ): Promise<Warehouse> {
    if (!warehouse) {
      const priority = await this.getPriority()
      console.log({ priority })
      return new Warehouse(
        storeId,
        data.name,
        data.address.zipCode,
        data.address.state,
        data.address.city,
        data.address.district,
        data.address.street,
        data.address.number,
        data.address.complement,
        priority
      )
    }

    if (data.hasOwnProperty('name')) {
      warehouse.setName(data.name)
    }

    if (data.hasOwnProperty('address')) {
      if (data.address.hasOwnProperty('zipCode')) {
        warehouse.setAddressZipCode(data.address.zipCode)
      }

      if (data.address.hasOwnProperty('state')) {
        warehouse.setAddressState(data.address.state)
      }

      if (data.address.hasOwnProperty('city')) {
        warehouse.setAddressCity(data.address.city)
      }

      if (data.address.hasOwnProperty('district')) {
        warehouse.setAddressDistrict(data.address.district)
      }

      if (data.address.hasOwnProperty('street')) {
        warehouse.setAddressStreet(data.address.street)
      }

      if (data.address.hasOwnProperty('number')) {
        warehouse.setAddressNumber(data.address.number)
      }

      if (data.address.hasOwnProperty('complement')) {
        warehouse.setAddressComplement(data.address.complement)
      }
    }

    return warehouse
  }

  private async getPriority() {
    return this.warehouseRepository.getNextPriority()
  }
}
