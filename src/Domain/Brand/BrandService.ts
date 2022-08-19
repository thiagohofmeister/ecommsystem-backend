import { DataNotFoundException, IItemListModel } from 'ecommsystem-core'
import { kebabCase } from 'lodash'

import { BrandValidator } from './BrandValidator'
import { BrandCreateDto } from './Dto/BrandCreateDto'
import { BrandGetListFilterDto } from './Dto/BrandGetListFilterDto'
import { BrandSaveDto } from './Dto/BrandSaveDto'
import { BrandUpdateDto } from './Dto/BrandUpdateDto'
import { Brand } from './Models/Brand'
import { BrandRepository } from './Repositories/BrandRepository'

export class BrandService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly brandValidator: BrandValidator
  ) {}

  public async create(storeId: string, data: BrandCreateDto): Promise<Brand> {
    await this.brandValidator.brandCreatePayloadValidate(data)

    return this.save(storeId, data)
  }

  public async update(
    id: string,
    storeId: string,
    data: BrandUpdateDto
  ): Promise<Brand> {
    await this.brandValidator.brandUpdatePayloadValidate(data)

    return this.save(storeId, data, await this.getOneById(id))
  }

  public async getOneById(id: string): Promise<Brand> {
    return this.brandRepository.findOneByPrimaryColumn(id)
  }

  public async list(
    filter: BrandGetListFilterDto
  ): Promise<IItemListModel<Brand>> {
    return this.brandRepository.findAll(filter)
  }

  private async save(
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
