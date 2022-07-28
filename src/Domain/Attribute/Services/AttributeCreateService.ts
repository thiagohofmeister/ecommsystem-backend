import { AttributeValidator } from '../AttributeValidator'
import { AttributeCreateDto } from '../Dto/AttributeCreateDto'
import { Attribute } from '../Models/Attribute'
import { AttributeSaveService } from './AttributeSaveService'

export class AttributeCreateService {
  constructor(
    private readonly attributeSaveService: AttributeSaveService,
    private readonly attributeValidator: AttributeValidator
  ) {}

  public async execute(
    storeId: string,
    data: AttributeCreateDto
  ): Promise<Attribute> {
    await this.attributeValidator.attributeCreatePayloadValidate(data)

    return this.attributeSaveService.execute(storeId, data)
  }
}
