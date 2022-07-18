import { randomUUID } from 'crypto'

export class Category {
  constructor(
    private label: string,
    private urn: string,
    private description: string,
    private id?: string,
    private parent: Category = null
  ) {
    if (!id) this.id = randomUUID()
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

  public getId(): string {
    return this.id
  }

  public getParent(): Category {
    return this.parent
  }
}
