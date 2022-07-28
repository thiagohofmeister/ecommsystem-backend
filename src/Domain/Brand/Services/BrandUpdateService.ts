import { BrandValidator } from '../BrandValidator'
import { BrandUpdateDto } from '../Dto/BrandUpdateDto'
import { Brand } from '../Models/Brand'
import { BrandGetOneByIdService } from './BrandGetOneByIdService'
import { BrandSaveService } from './BrandSaveService'

export class BrandUpdateService {
  constructor(
    private readonly brandSaveService: BrandSaveService,
    private readonly brandGetOneByIdService: BrandGetOneByIdService,
    private readonly brandValidator: BrandValidator
  ) {}

  public async execute(
    id: string,
    storeId: string,
    data: BrandUpdateDto
  ): Promise<Brand> {
    await this.brandValidator.brandUpdatePayloadValidate(data)

    return this.brandSaveService.execute(
      storeId,
      data,
      await this.brandGetOneByIdService.execute(id)
    )
  }
}
