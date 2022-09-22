import { Image } from '../../Product/Models/Image'
import { Price } from '../../Product/Models/Price'
import { Product } from '../../Product/Models/Product'
import { MeasureUnitEnum } from '../Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../Enums/WeightUnitEnum'
import { Stock } from './Stock'
import { VariationAttribute } from './VariationAttribute'

export class Variation {
  private variationAttributes: VariationAttribute[]
  private stocks: Stock[]
  private prices: Price[]
  private images: Image[]
  private currentPrice: Price

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

  public removeAttributes(keepAttributeIds: string[]) {
    if (!this.variationAttributes) this.variationAttributes = []

    this.variationAttributes = this.variationAttributes.filter(attr =>
      keepAttributeIds.includes(attr.getAttribute().getId())
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

  public removeStocks(keepWarehouseIds: string[]) {
    if (!this.stocks) this.stocks = []

    this.stocks = this.stocks.filter(stock => keepWarehouseIds.includes(stock.getWarehouse().getId()))

    return this
  }

  public addStock(stock: Stock) {
    if (!this.stocks) this.stocks = []

    this.stocks.push(stock)
    return this
  }

  public getStocks() {
    return this.stocks
  }

  public removePrices(keepPriceIds: string[]) {
    if (!this.prices) this.prices = []

    this.prices = this.prices.filter(price => keepPriceIds.includes(price.getId()))

    return this
  }

  public addPrice(stock: Price) {
    if (!this.prices) this.prices = []

    this.prices.push(stock)
    return this
  }

  public getPrices() {
    return this.prices
  }

  public getCurrentPrice(): Price {
    if (!this.currentPrice && this.prices?.length === 1) {
      this.currentPrice = this.prices[0]
    }

    return this.currentPrice
  }

  public addImage(image: Image) {
    if (!this.images) this.images = []

    this.images.push(image)
    return this
  }

  public getImages() {
    return this.images
  }
}
