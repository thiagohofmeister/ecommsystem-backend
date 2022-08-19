import { DataNotFoundException } from 'ecommsystem-core'

export class VariationAttributeDataNotFound extends DataNotFoundException {
  constructor() {
    super('VariationAttribute data not found.')
  }
}
