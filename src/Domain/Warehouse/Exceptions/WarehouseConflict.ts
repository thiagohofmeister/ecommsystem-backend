import { ConflictException } from '../../../Core/Models/Exceptions/ConflictException'

export class WarehouseConflict extends ConflictException {
  constructor() {
    super('Warehouse already exists.')
  }
}
