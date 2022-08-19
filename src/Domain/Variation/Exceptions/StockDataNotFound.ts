import { DataNotFoundException } from 'ecommsystem-core'

export class StockDataNotFound extends DataNotFoundException {
  constructor() {
    super('Stock data not found.')
  }
}
