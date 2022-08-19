import { DataNotFoundException } from 'ecommsystem-core'

export class ProductDataNotFound extends DataNotFoundException {
  constructor() {
    super('Product data not found.')
  }
}
