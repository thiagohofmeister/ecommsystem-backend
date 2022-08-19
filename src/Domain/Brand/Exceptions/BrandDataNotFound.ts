import { DataNotFoundException } from 'ecommsystem-core'

export class BrandDataNotFound extends DataNotFoundException {
  constructor() {
    super('Brand data not found.')
  }
}
