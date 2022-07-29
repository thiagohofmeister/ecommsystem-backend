import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class PriceDataNotFound extends DataNotFoundException {
  constructor() {
    super('Price data not found.')
  }
}
