import { DataNotFoundException } from 'ecommsystem-core'

export class VariationDataNotFound extends DataNotFoundException {
  constructor() {
    super('Variation data not found.')
  }
}
