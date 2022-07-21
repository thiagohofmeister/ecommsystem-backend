import { MeasureUnitEnum } from '../Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../Enums/WeightUnitEnum'
import { Product } from './Product'

export class Variation {
  constructor(
    private sku: string,
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

  public getSku(): string {
    return this.sku
  }

  public getWidth(): number {
    return this.width
  }

  public getLength(): number {
    return this.length
  }

  public getHeight(): number {
    return this.height
  }

  public getMeasuresUnit(): MeasureUnitEnum {
    return this.measuresUnit
  }

  public getWeight(): number {
    return this.weight
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
}
