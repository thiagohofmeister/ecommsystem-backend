import {
  DataNotFoundException,
  IItemListModel,
  InvalidDataException
} from 'ecommsystem-core'

import { WarehouseCreateDto } from './Dto/WarehouseCreateDto'
import { WarehouseGetListFilterDto } from './Dto/WarehouseGetListFilterDto'
import { WarehouseSaveDto } from './Dto/WarehouseSaveDto'
import { WarehouseSavePriorityDto } from './Dto/WarehouseSavePriorityDto'
import { WarehouseUpdateDto } from './Dto/WarehouseUpdateDto'
import { WarehouseConflict } from './Exceptions/WarehouseConflict'
import { Warehouse } from './Models/Warehouse'
import { WarehouseRepository } from './Repositories/WarehouseRepository'
import { WarehouseValidator } from './WarehouseValidator'

export class WarehouseService {
  constructor(
    private readonly warehouseRepository: WarehouseRepository,
    private readonly warehouseValidator: WarehouseValidator
  ) {}

  public async create(
    storeId: string,
    data: WarehouseCreateDto
  ): Promise<Warehouse> {
    await this.validateWarehouseAlreadyExists(
      data.address.zipCode,
      data.address.number
    )

    await this.warehouseValidator.warehouseCreatePayloadValidate(data)

    return this.save(storeId, data)
  }

  public async update(
    id: string,
    storeId: string,
    data: WarehouseUpdateDto
  ): Promise<Warehouse> {
    await this.warehouseValidator.warehouseUpdatePayloadValidate(data)

    return this.save(storeId, data, await this.getOneById(id))
  }

  public async getOneById(id: string): Promise<Warehouse> {
    return this.warehouseRepository.findOneByPrimaryColumn(id)
  }

  public async savePriorities(
    storeId: string,
    data: WarehouseSavePriorityDto[]
  ) {
    await this.warehouseValidator.warehouseSavePriorityPayloadValidate(data)

    const warehousesIds = await this.getWarehousesIds()
    const warehousesIdsDto = data.map(warehouse => warehouse.id)

    const invalidDataException = new InvalidDataException('Invalid data.')

    // Warehouses not found on database.
    warehousesIdsDto
      .filter(id => !warehousesIds.includes(id))
      .forEach(id => {
        const index = warehousesIdsDto.findIndex(idDto => idDto === id)

        invalidDataException.addReason({
          id: `${index}.id.${id}.notFound`,
          message: `Field ${index}.id.${id} not found.`
        })
      })

    // Warehouses not sent on payload and required.
    warehousesIds
      .filter(id => !warehousesIdsDto.includes(id))
      .forEach(idDto => {
        invalidDataException.addReason({
          id: `[].id.${idDto}.required`,
          message: `Field [].id.${idDto} is required.`
        })
      })

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }

    return await Promise.all(
      data.map(async (warehouseDto, priority) => {
        const warehouse = await this.getOneById(warehouseDto.id)

        return this.save(storeId, { priority, ...data }, warehouse)
      })
    )
  }

  public async list(
    filter: WarehouseGetListFilterDto
  ): Promise<IItemListModel<Warehouse>> {
    return this.warehouseRepository.findAll(filter)
  }

  private async save(
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

  private async getWarehousesIds(): Promise<string[]> {
    const warehouses = []

    let page = 1
    const size = 1
    let result

    do {
      result = await this.list({
        page: page++,
        size
      })

      warehouses.push(...result.items.map(item => item.getId()))
    } while (Math.round(size * page) <= result.total)

    return warehouses
  }

  private async getWarehouseToSave(
    storeId: string,
    data: WarehouseSaveDto,
    warehouse?: Warehouse
  ): Promise<Warehouse> {
    if (!warehouse) {
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
        await this.getPriority()
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

    if (data.hasOwnProperty('priority')) {
      warehouse.setPriority(data.priority)
    }

    return warehouse
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

  private async getPriority() {
    return this.warehouseRepository.getNextPriority()
  }
}
