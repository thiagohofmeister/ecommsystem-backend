import { MeasureUnitEnum } from '../Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../Enums/WeightUnitEnum'
import { Product } from './Product'
import { VariationAttribute } from './VariationAttribute'

export class Variation {
  private variationAttributes: VariationAttribute[]

  constructor(
    private sku: string,
    private storeId: string,
    private width: number,
    private length: number,
    private height: number,
    private weight: number,
    private measuresUnit: MeasureUnitEnum,
    private weightUnit: WeightUnitEnum,
    private product?: Product,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {}

  public getStoreId(): string {
    return this.storeId
  }

  public getSku(): string {
    return this.sku
  }

  public setWidth(width: number) {
    this.width = width
    return this
  }

  public getWidth(): number {
    return this.width
  }

  public setLength(length: number) {
    this.length = length
    return this
  }

  public getLength(): number {
    return this.length
  }

  public setHeight(height: number) {
    this.height = height
    return this
  }

  public getHeight(): number {
    return this.height
  }

  public setMeasuresUnit(measuresUnit: MeasureUnitEnum) {
    this.measuresUnit = measuresUnit
    return this
  }

  public getMeasuresUnit(): MeasureUnitEnum {
    return this.measuresUnit
  }

  public setWeight(weight: number) {
    this.weight = weight
    return this
  }

  public getWeight(): number {
    return this.weight
  }

  public setWeightUnit(weightUnit: WeightUnitEnum) {
    this.weightUnit = weightUnit
    return this
  }

  public getWeightUnit(): WeightUnitEnum {
    return this.weightUnit
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setProduct(product: Product): this {
    this.product = product
    return this
  }

  public getProduct(): Product {
    return this.product
  }

  public removeAttributes(keepVariationSkus: string[]) {
    if (!this.variationAttributes) this.variationAttributes = []

    this.variationAttributes = this.variationAttributes.filter(attr =>
      keepVariationSkus.includes(attr.getVariation().getSku())
    )

    return this
  }

  public addAttribute(attribute: VariationAttribute) {
    if (!this.variationAttributes) this.variationAttributes = []

    this.variationAttributes.push(attribute)
    return this
  }

  public getAttributes() {
    return this.variationAttributes
  }
}
