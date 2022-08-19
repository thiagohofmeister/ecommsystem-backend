import { ConflictException } from 'ecommsystem-core'

export class WarehouseConflict extends ConflictException {
  constructor() {
    super('Warehouse already exists.')
  }
}
