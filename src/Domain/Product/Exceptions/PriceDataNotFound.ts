import { DataNotFoundException } from 'ecommsystem-core'

export class PriceDataNotFound extends DataNotFoundException {
  constructor() {
    super('Price data not found.')
  }
}
