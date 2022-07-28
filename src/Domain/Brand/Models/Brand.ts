import { randomUUID } from 'crypto'

export class Brand {
  constructor(
    private storeId: string,
    private label: string,
    private urn: string,
    private description: string,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
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

  public setUrn(urn: string) {
    this.urn = urn
    return this
  }

  public getUrn(): string {
    return this.urn
  }

  public setDescription(description: string) {
    this.description = description
    return this
  }

  public getDescription(): string {
    return this.description
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
}
