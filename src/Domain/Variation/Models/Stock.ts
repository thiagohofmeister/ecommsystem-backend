import { Warehouse } from '../../Warehouse/Models/Warehouse'
import { Variation } from './Variation'

export class Stock {
  constructor(
    private quantity: number,
    private storeId: string,
    private variation?: Variation,
    private warehouse?: Warehouse
  ) {}

  public getQuantity(): number {
    return this.quantity
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity
    return this
  }

  public getStoreId(): string {
    return this.storeId
  }

  public setStoreId(storeId: string) {
    this.storeId = storeId
    return this
  }

  public getVariation(): Variation {
    return this.variation
  }

  public setVariation(variation: Variation) {
    this.variation = variation
    return this
  }

  public getWarehouse(): Warehouse {
    return this.warehouse
  }

  public setWarehouse(warehouse: Warehouse) {
    this.warehouse = warehouse
    return this
  }
}
