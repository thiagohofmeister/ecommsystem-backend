export class CategoryTree {
  private children: CategoryTree[]

  constructor(private id: string, private label: string, private urn: string) {
    this.children = []
  }

  public getId(): string {
    return this.id
  }

  public getLabel(): string {
    return this.label
  }

  public getUrn(): string {
    return this.urn
  }

  public getChildren(): CategoryTree[] {
    return this.children
  }

  public setChildren(children: CategoryTree[]) {
    this.children = children
    return this
  }

  public addChild(child: CategoryTree) {
    this.children.push(child)
    return this
  }
}
