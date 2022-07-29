import { Attribute } from '../../Attribute/Models/Attribute'
import { Variation } from './Variation'

export class VariationAttribute {
  constructor(
    private storeId: string,
    private value: string,
    private variation?: Variation,
    private attribute?: Attribute
  ) {}

  public getValue(): string {
    return this.value
  }

  public setValue(value: string): void {
    this.value = value
  }

  public getStoreId(): string {
    return this.storeId
  }

  public getAttribute(): Attribute {
    return this.attribute
  }

  public setAttribute(attribute: Attribute) {
    this.attribute = attribute
    return this
  }

  public getVariation(): Variation {
    return this.variation
  }

  public setVariation(variation: Variation) {
    this.variation = variation
    return this
  }
}
