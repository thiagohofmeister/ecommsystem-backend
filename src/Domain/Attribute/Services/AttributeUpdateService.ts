import { AttributeValidator } from '../AttributeValidator'
import { AttributeUpdateDto } from '../Dto/AttributeUpdateDto'
import { Attribute } from '../Models/Attribute'
import { AttributeGetOneByIdService } from './AttributeGetOneByIdService'
import { AttributeSaveService } from './AttributeSaveService'

export class AttributeUpdateService {
  constructor(
    private readonly attributeSaveService: AttributeSaveService,
    private readonly attributeGetOneByIdService: AttributeGetOneByIdService,
    private readonly attributeValidator: AttributeValidator
  ) {}

  public async execute(
    id: string,
    storeId: string,
    data: AttributeUpdateDto
  ): Promise<Attribute> {
    await this.attributeValidator.attributeUpdatePayloadValidate(data)

    return this.attributeSaveService.execute(
      storeId,
      data,
      await this.attributeGetOneByIdService.execute(id)
    )
  }
}
