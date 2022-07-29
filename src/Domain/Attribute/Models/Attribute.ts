import { randomUUID } from 'crypto'
import { VariationAttribute } from '../../Variation/Models/VariationAttribute'

export class Attribute {
  private variationAttributes: VariationAttribute[]

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
