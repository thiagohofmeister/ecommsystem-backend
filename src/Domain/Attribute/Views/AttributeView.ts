import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Core/Views/Interfaces/IViewResponse'
import { Attribute } from '../Models/Attribute'

export class AttributeView extends ViewContract<Attribute> {
  protected renderOne(entity: Attribute): AttributeResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      values: entity.getValues()
    }
  }
}

export interface AttributeResponse extends IViewResponse {
  id: string
  label: string
  values: string
}
