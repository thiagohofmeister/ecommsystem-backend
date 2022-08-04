import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class VariationCurrentPriceDataNotFound extends DataNotFoundException {
  constructor() {
    super('VariationCurrentPrice data not found.')
  }
}
