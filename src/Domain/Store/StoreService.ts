import { User } from '../User/Models/User'
import { StoreCreateDto } from './Dto/StoreCreateDto'
import { Store } from './Models/Store'
import { StoreRepository } from './Repositories/StoreRepository'
import { StoreValidator } from './StoreValidator'

export class StoreService {
  constructor(
    private readonly repository: StoreRepository,
    private readonly validator: StoreValidator
  ) {}

  public async create(user: User, data: StoreCreateDto): Promise<Store> {
    await this.validator.storeCreatePayloadValidate(data)

    return this.repository.save(
      new Store(
        data.name,
        data.document.type,
        data.document.number,
        data.document.name,
        data.email,
        data.phone,
        user
      )
    )
  }

  public async findOneByDocumentNumber(documentNumber: string): Promise<Store> {
    return this.repository.findOneByDocumentNumber(documentNumber)
  }
}
