import { DataNotFoundException } from 'ecommsystem-core'

export class VariationCurrentPriceDataNotFound extends DataNotFoundException {
  constructor() {
    super('VariationCurrentPrice data not found.')
  }
}
