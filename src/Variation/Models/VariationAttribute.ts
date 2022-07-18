import { Attribute } from '../../Attribute/Models/Attribute'
import { Variation } from './Variation'

export class VariationAttribute {
  constructor(
    private variation: Variation,
    private attribute: Attribute,
    private value: string
  ) {}

  public getProduct(): Variation {
    return this.variation
  }

  public getAttribute(): Attribute {
    return this.attribute
  }

  public getValue(): string {
    return this.value
  }
}
