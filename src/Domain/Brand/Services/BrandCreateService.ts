import { BrandValidator } from '../BrandValidator'
import { BrandCreateDto } from '../Dto/BrandCreateDto'
import { Brand } from '../Models/Brand'
import { BrandSaveService } from './BrandSaveService'

export class BrandCreateService {
  constructor(
    private readonly brandSaveService: BrandSaveService,
    private readonly brandValidator: BrandValidator
  ) {}

  public async execute(storeId: string, data: BrandCreateDto): Promise<Brand> {
    await this.brandValidator.brandCreatePayloadValidate(data)

    return this.brandSaveService.execute(storeId, data)
  }
}
