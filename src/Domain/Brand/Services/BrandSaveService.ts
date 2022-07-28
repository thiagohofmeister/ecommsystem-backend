import { kebabCase } from 'lodash'

import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { BrandSaveDto } from '../Dto/BrandSaveDto'
import { Brand } from '../Models/Brand'
import { BrandRepository } from '../Repositories/BrandRepository'

export class BrandSaveService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async execute(
    storeId: string,
    data: BrandSaveDto,
    brand?: Brand
  ): Promise<Brand> {
    const brandToSave = await this.getBrandToSave(storeId, data, brand)

    return this.brandRepository.save(brandToSave)
  }

  private async getBrandToSave(
    storeId: string,
    data: BrandSaveDto,
    brand?: Brand
  ): Promise<Brand> {
    if (!brand) {
      return new Brand(
        storeId,
        data.label,
        await this.generateUrn(data.urn || data.label),
        data.description
      )
    }

    if (data.hasOwnProperty('label')) {
      brand.setLabel(data.label)
    }

    if (data.hasOwnProperty('description')) {
      brand.setDescription(data.description)
    }

    return brand.setUrn(
      await this.generateUrn(data.urn || data.label || brand.getLabel(), brand)
    )
  }

  private async generateUrn(str: string, brand?: Brand, count: number = 0) {
    const slug = `${kebabCase(str)}${count ? `-${count}` : ''}`

    try {
      const brandFound = await this.brandRepository.findOneByUrn(slug)

      if (brandFound.getId() === brand?.getId()) {
        return slug
      }

      return this.generateUrn(str, brand, ++count)
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    return slug
  }
}
