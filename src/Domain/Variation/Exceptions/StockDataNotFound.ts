import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class StockDataNotFound extends DataNotFoundException {
  constructor() {
    super('Stock data not found.')
  }
}
