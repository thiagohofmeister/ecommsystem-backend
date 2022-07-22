import { randomUUID } from 'crypto'
import { Brand } from '../../Brand/Models/Brand'
import { Category } from '../../Category/Models/Category'
import { Variation } from './Variation'

export class Product {
  private category: Category
  private brand: Brand
  private variations: Variation[]

  constructor(
    private storeId: string,
    private title: string,
    private description: string,
    private active: boolean,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    if (!id) this.id = randomUUID()
  }

  public getStoreId(): string {
    return this.storeId
  }

  public getTitle(): string {
    return this.title
  }

  public getDescription(): string {
    return this.description
  }

  public isActive(): boolean {
    return this.active
  }

  public getCategory(): Category {
    return this.category
  }

  public setCategory(category: Category) {
    this.category = category
    return this
  }

  public getBrand(): Brand {
    return this.brand
  }

  public setBrand(brand: Brand) {
    this.brand = brand
    return this
  }

  public getId(): string {
    return this.id
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public getVariations() {
    return this.variations
  }

  public addVariation(variation: Variation) {
    if (!this.variations) this.variations = []

    this.variations.push(variation)
    return this
  }

  public getVariationSkus(): string[] {
    return this.variations?.map(variation => variation.getSku()) || []
  }
}
