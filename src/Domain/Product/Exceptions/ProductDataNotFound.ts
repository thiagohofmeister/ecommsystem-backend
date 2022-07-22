import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class ProductDataNotFound extends DataNotFoundException {
  constructor() {
    super('Product data not found.')
  }
}
