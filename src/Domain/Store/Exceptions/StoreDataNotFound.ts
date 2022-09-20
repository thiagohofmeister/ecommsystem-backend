import { DataNotFoundException } from 'ecommsystem-core'

export class StoreDataNotFound extends DataNotFoundException {
  constructor() {
    super('Store data not found.')
  }
}
