import { randomUUID } from 'crypto'
import { Variation } from '../../Variation/Models/Variation'

export class Price {
  constructor(
    private storeId: string,
    private list: number,
    private sale: number,
    private id?: string,
    private variation?: Variation,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    if (!this.id) this.id = randomUUID()
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getVariation(): Variation {
    return this.variation
  }

  public setVariation(variation: Variation) {
    this.variation = variation
    return this
  }

  public getId(): string {
    return this.id
  }

  public getSale(): number {
    return this.sale
  }

  public setSale(sale: number) {
    this.sale = sale
    return this
  }

  public getList(): number {
    return this.list
  }

  public setList(list: number) {
    this.list = list
    return this
  }

  public getStoreId(): string {
    return this.storeId
  }
}
