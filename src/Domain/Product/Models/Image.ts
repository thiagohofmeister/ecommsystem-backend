import { randomUUID } from 'crypto'
import { Product } from './Product'

export class Image {
  constructor(
    private url: string,
    private position: number,
    private value: string,
    private storeId: string,
    private id?: string,
    private product?: Product
  ) {
    if (!this.id) this.id = randomUUID()
  }

  public getId(): string {
    return this.id
  }

  public getProduct(): Product {
    return this.product
  }

  public setProduct(product: Product): void {
    this.product = product
  }

  public getStoreId(): string {
    return this.storeId
  }

  public getValue(): string {
    return this.value
  }

  public setValue(value: string) {
    this.value = value
    return this
  }

  public getPosition(): number {
    return this.position
  }

  public setPosition(position: number) {
    this.position = position
    return this
  }

  public setUrl(url: string) {
    this.url = url
    return this
  }

  public getUrl(): string {
    return this.url
  }
}
