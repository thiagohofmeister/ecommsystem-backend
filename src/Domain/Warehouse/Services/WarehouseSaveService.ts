import { kebabCase } from 'lodash'

import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
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

    return this.warehouseRepository.save(warehouseToSave)
  }

  private async getWarehouseToSave(
    storeId: string,
    data: WarehouseSaveDto,
    warehouse?: Warehouse
  ): Promise<Warehouse> {
    if (!warehouse) {
      return new Warehouse(
        storeId,
        data.label,
        await this.generateUrn(data.urn || data.label),
        data.description
      )
    }

    if (data.hasOwnProperty('label')) {
      warehouse.setLabel(data.label)
    }

    if (data.hasOwnProperty('description')) {
      warehouse.setDescription(data.description)
    }

    return warehouse.setUrn(
      await this.generateUrn(
        data.urn || data.label || warehouse.getLabel(),
        warehouse
      )
    )
  }

  private async generateUrn(
    str: string,
    warehouse?: Warehouse,
    count: number = 0
  ) {
    const slug = `${kebabCase(str)}${count ? `-${count}` : ''}`

    try {
      const warehouseFound = await this.warehouseRepository.findOneByUrn(slug)

      if (warehouseFound.getId() === warehouse?.getId()) {
        return slug
      }

      return this.generateUrn(str, warehouse, ++count)
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    return slug
  }
}
