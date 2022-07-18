import { Product } from './Product'
import { VariationAttribute } from './VariationAttribute'

export class Variation {
  private variationAttributes: VariationAttribute[]

  constructor(
    private sku: string,
    private product: Product,
    private listPrice: number,
    private salePrice: number,
    private quantity: number,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {}

  public getSku(): string {
    return this.sku
  }

  public getProduct(): Product {
    return this.product
  }

  public addAttribute(variationAttribute: VariationAttribute): this {
    if (!this.variationAttributes) this.variationAttributes = []

    this.variationAttributes.push(variationAttribute)
    return this
  }

  public getAttributes(): VariationAttribute[] {
    return this.variationAttributes
  }

  public getListPrice(): number {
    return this.listPrice
  }

  public getSalePrice(): number {
    return this.salePrice
  }

  public getQuantity(): number {
    return this.quantity
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }
}
