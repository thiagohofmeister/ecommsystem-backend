import { ViewContract } from 'ecommsystem-core'
import { Stock } from '../Models/Stock'

export class StockView extends ViewContract<Stock, StockResponse> {
  constructor() {
    super()
  }

  renderOne(entity: Stock): StockResponse {
    return {
      warehouse: {
        id: entity.getWarehouse().getId()
      },
      variation: {
        sku: entity.getVariation().getSku()
      },
      quantity: entity.getQuantity()
    }
  }
}

export interface StockResponse {
  warehouse: {
    id: string
  }
  variation: {
    sku: string
  }
  quantity: number
}
