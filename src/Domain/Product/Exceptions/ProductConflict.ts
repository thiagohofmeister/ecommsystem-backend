import { ConflictException } from 'ecommsystem-core'

export class ProductConflict extends ConflictException {
  constructor() {
    super('Product already exists.')
  }
}
