import { randomUUID } from 'crypto'

export class Attribute {
  constructor(
    private storeId: string,
    private label: string,
    private values: string,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getStoreId(): string {
    return this.storeId
  }

  public setLabel(label: string) {
    this.label = label
    return this
  }

  public getLabel(): string {
    return this.label
  }

  public setValues(values: string) {
    this.values = values
    return this
  }

  public getValues(): string {
    return this.values
  }

  public getId(): string {
    return this.id
  }
}
