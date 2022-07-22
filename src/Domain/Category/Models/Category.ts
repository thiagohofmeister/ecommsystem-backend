import { randomUUID } from 'crypto'

export class Category {
  constructor(
    private storeId: string,
    private label: string,
    private urn: string,
    private description: string,
    private parent: Category,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    if (!id) this.id = randomUUID()
  }

  public getStoreId(): string {
    return this.storeId
  }

  public getLabel(): string {
    return this.label
  }

  public getUrn(): string {
    return this.urn
  }

  public getDescription(): string {
    return this.description
  }

  public getParent(): Category {
    return this.parent
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
