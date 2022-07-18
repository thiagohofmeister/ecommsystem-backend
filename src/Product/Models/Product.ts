import { randomUUID } from 'crypto'

export class Product {
  private variations: Variation[]
  private productAttributes: ProductAttribute[]

  constructor(
    private title: string,
    private description: string,
    private width: number,
    private height: number,
    private length: number,
    private weight: number,
    private category: Category,
    private priceList: number,
    private priceSale: number,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    if (!id) this.id = randomUUID()
  }

  public getTitle(): string {
    return this.title
  }

  public getDescription(): string {
    return this.description
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
  }

  public getLength(): number {
    return this.length
  }

  public getWeight(): number {
    return this.weight
  }

  public getCategory(): Category {
    return this.category
  }

  public getPriceList(): number {
    return this.priceList
  }

  public getPriceSale(): number {
    return this.priceSale
  }

  public getId(): string {
    return this.id
  }

  public addVariation(variation: Variation): this {
    if (!this.variations) this.variations = []

    this.variations.push(variation)
    return this
  }

  public getVariations(): Variation[] {
    return this.variations
  }

  public addAttribute(productAttribute: ProductAttribute): this {
    if (!this.productAttributes) this.productAttributes = []

    this.productAttributes.push(productAttribute)
    return this
  }

  public getAttributes(): ProductAttribute[] {
    return this.productAttributes
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }
}
