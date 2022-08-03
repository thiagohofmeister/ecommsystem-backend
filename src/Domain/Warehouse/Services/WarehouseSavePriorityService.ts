import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { WarehouseSavePriorityDto } from '../Dto/WarehouseSavePriorityDto'
import { WarehouseValidator } from '../WarehouseValidator'
import { WarehouseGetListService } from './WarehouseGetListService'
import { WarehouseGetOneByIdService } from './WarehouseGetOneByIdService'
import { WarehouseSaveService } from './WarehouseSaveService'

export class WarehouseSavePriorityService {
  constructor(
    private readonly warehouseGetListService: WarehouseGetListService,
    private readonly warehouseSaveService: WarehouseSaveService,
    private readonly warehouseGetOneByIdService: WarehouseGetOneByIdService,
    private readonly warehouseValidator: WarehouseValidator
  ) {}

  public async execute(storeId: string, data: WarehouseSavePriorityDto[]) {
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
        const warehouse = await this.warehouseGetOneByIdService.execute(
          warehouseDto.id
        )

        return this.warehouseSaveService.execute(
          storeId,
          { priority, ...data },
          warehouse
        )
      })
    )
  }

  public async getWarehousesIds(): Promise<string[]> {
    const warehouses = []

    let page = 1
    const size = 1
    let result

    do {
      result = await this.warehouseGetListService.execute({
        page: page++,
        size
      })

      warehouses.push(...result.items.map(item => item.getId()))
    } while (Math.round(size * page) <= result.total)

    return warehouses
  }
}
