import { randomUUID } from 'crypto'

import { Brand } from '../../Brand/Models/Brand'
import { Category } from '../../Category/Models/Category'
import { Variation } from '../../Variation/Models/Variation'
import { ProductVariationTemplate } from '../Interfaces/ProductVariationTemplate'
import { Image } from '../Models/Image'

export class Product {
  private category: Category
  private brand: Brand
  private variations: Variation[]
  private images: Image[]

  constructor(
    private storeId: string,
    private title: string,
    private description: string,
    private variationTemplate: ProductVariationTemplate,
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

  public setTitle(title: string) {
    this.title = title
    return this
  }

  public getTitle(): string {
    return this.title
  }

  public setDescription(description: string) {
    this.description = description
    return this
  }

  public getDescription(): string {
    return this.description
  }

  public setVariationTemplate(variationTemplate: ProductVariationTemplate) {
    this.variationTemplate = variationTemplate
    return this
  }

  public getVariationTemplate(): ProductVariationTemplate {
    return this.variationTemplate
  }

  public setActive(active: boolean) {
    this.active = active
    return this
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

  public getVariationBySku(sku: string) {
    return this.variations?.find(variation => variation.getSku() === sku)
  }

  public removeVariations(skusToKeep: string[]) {
    if (!this.variations) this.variations = []
    this.variations = this.variations.filter(variation => skusToKeep.includes(variation.getSku()))
    return this
  }

  public addVariation(variation: Variation) {
    if (!this.variations) this.variations = []

    this.variations.push(variation)
    return this
  }

  public getImages() {
    return this.images?.sort((a, b) => a.getPosition() - b.getPosition()) || []
  }

  public getVariationImages(sku: string) {
    const combination = this.getVariationTemplateImagesCombination(sku)

    return this.getImages().filter(image => image.getValue() === combination || !image.getValue())
  }

  public fillVariationsImages() {
    this.getVariations().forEach(variation =>
      this.getVariationImages(variation.getSku()).forEach(image => variation.addImage(image))
    )
  }

  public removeImages(idsToKeep: string[]) {
    if (!this.images) this.images = []
    this.images = this.images.filter(image => idsToKeep.includes(image.getId()))
    return this
  }

  public addImage(image: Image) {
    if (!this.images) this.images = []

    this.images.push(image)
    return this
  }

  public getVariationSkus(): string[] {
    return this.variations?.map(variation => variation.getSku()) || []
  }

  public getImageById(id: string): Image {
    return this.images?.find(image => image.getId() === id)
  }

  public getImagesIds(): string[] {
    return this.images?.map(image => image.getId()) || []
  }

  public getVariationTemplateImagesCombination(sku: string) {
    if (!this.variationTemplate?.images) return null

    const variation = this.getVariationBySku(sku)

    const combination = []

    variation.getAttributes().forEach(attribute => {
      combination.push(attribute.getValue())

      if (attribute.getAttribute().getId() === this.variationTemplate?.images) return
    })

    return combination.join('+')
  }
}
