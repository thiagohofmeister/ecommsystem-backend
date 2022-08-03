import { WarehouseRepository } from '../../Warehouse/Repositories/WarehouseRepository'
import { VariationSavePricesDto } from '../Dto/VariationSaveStocksDto'
import { Stock } from '../Models/Stock'
import { StockRepository } from '../Repositories/StockRepository'
import { VariationRepository } from '../Repositories/VariationRepository'
import { VariationValidator } from '../VariationValidator'

export class VariationSaveStocksService {
  constructor(
    private readonly variationRepository: VariationRepository,
    private readonly warehouseRepository: WarehouseRepository,
    private readonly stockRepository: StockRepository,
    private readonly variationValidator: VariationValidator
  ) {}

  public async execute(
    sku: string,
    storeId: string,
    data: VariationSavePricesDto[]
  ): Promise<Stock[]> {
    await this.variationValidator.variationSaveStocksPayloadValidate(data)

    const warehouses = await this.warehouseRepository.findByIds(
      data.map(stockDto => stockDto.warehouse.id)
    )

    const variation = await this.variationRepository.findOneByPrimaryColumn(sku)

    const stocks = await Promise.all(
      data.map(async stockDto => {
        const stock = new Stock(
          stockDto.quantity,
          storeId,
          variation,
          warehouses.find(
            warehouse => warehouse.getId() === stockDto.warehouse.id
          )
        )

        return this.stockRepository.save(stock, false)
      })
    )

    return stocks
  }
}
