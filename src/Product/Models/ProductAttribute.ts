import { Attribute } from '../../Attribute/Models/Attribute'
import { Product } from './Product'

export class ProductAttribute {
  constructor(
    private product: Product,
    private attribute: Attribute,
    private value: string
  ) {}

  public getProduct(): Product {
    return this.product
  }

  public getAttribute(): Attribute {
    return this.attribute
  }

  public getValue(): string {
    return this.value
  }
}
