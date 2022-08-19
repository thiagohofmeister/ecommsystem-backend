import { DataNotFoundException } from 'ecommsystem-core'

export class WarehouseDataNotFound extends DataNotFoundException {
  constructor() {
    super('Warehouse data not found.')
  }
}
