import { DataNotFoundException } from 'ecommsystem-core'

export class AttributeDataNotFound extends DataNotFoundException {
  constructor() {
    super('Attribute data not found.')
  }
}
