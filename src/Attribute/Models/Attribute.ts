import { randomUUID } from 'crypto'

import { AttributeScopeEnum } from '../../Shared/Models/Enums/AttributeScopeEnum'
import { AttributeTypeEnum } from '../../Shared/Models/Enums/AttributeTypeEnum'

export class Attribute {
  constructor(
    private label: string,
    private type: AttributeTypeEnum,
    private values: string[],
    private scope: AttributeScopeEnum,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    if (!id) this.id = randomUUID()
  }

  public getLabel(): string {
    return this.label
  }

  public getType(): AttributeTypeEnum {
    return this.type
  }

  public getValues(): string[] {
    return this.values
  }

  public getScope(): AttributeScopeEnum {
    return this.scope
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
