import { Attribute } from '../Models/Attribute'
import { AttributeRepository } from '../Repositories/AttributeRepository'

export class AttributeGetOneByIdService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  public async execute(id: string): Promise<Attribute> {
    return this.attributeRepository.findOneByPrimaryColumn(id)
  }
}
