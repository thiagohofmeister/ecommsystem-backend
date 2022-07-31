import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class WarehouseDataNotFound extends DataNotFoundException {
  constructor() {
    super('Warehouse data not found.')
  }
}
