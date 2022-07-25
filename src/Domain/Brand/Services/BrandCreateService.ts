import { BrandRepository } from '../Repositories/BrandRepository'
import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { BrandValidator } from '../BrandValidator'
import { BrandCreateDto } from '../Dto/BrandCreateDto'
import { Brand } from '../Models/Brand'
import { kebabCase } from 'lodash'

export class BrandCreateService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly brandValidator: BrandValidator
  ) {}

  public async execute(storeId: string, data: BrandCreateDto): Promise<Brand> {
    await this.brandValidator.brandCreatePayloadValidate(data)

    const brand = new Brand(
      storeId,
      data.label,
      await this.generateUrn(data.urn || data.label),
      data.description
    )

    return this.brandRepository.save(brand)
  }

  private async generateUrn(str: string, count: number = 0) {
    const slug = `${kebabCase(str)}${count ? `-${count}` : ''}`

    try {
      await this.brandRepository.findOneByUrn(slug)
      return this.generateUrn(str, ++count)
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    return slug
  }
}
