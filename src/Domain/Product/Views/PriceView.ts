import { ViewContract } from 'ecommsystem-core'
import { Price } from '../Models/Price'

export class PriceView extends ViewContract<Price, PriceResponse> {
  protected renderOne(entity: Price): PriceResponse {
    return {
      sku: entity.getVariation().getSku(),
      list: entity.getList(),
      sale: entity.getSale()
    }
  }
}

export interface PriceResponse {
  sku: string
  campaign?: {
    id: string
  }
  list: number
  sale: number
}
