import { DataNotFoundException, UnauthorizedException } from 'ecommsystem-core'

import { AuthenticationCreateDto } from '../Authentication/Dto/AuthenticationCreateDto'
import { UserCreateDto } from './Dto/UserCreateDto'
import { User } from './Models/User'
import { UserRepository } from './Repositories/UserRepository'
import { UserValidator } from './UserValidator'

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: UserValidator
  ) {}

  async getById(id: string) {
    return this.repository.findOneByPrimaryColumn(id)
  }

  async findOneByAuthData(data: AuthenticationCreateDto) {
    try {
      return await this.repository.findOneByAuthData(data.login, data.password)
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) {
        throw e
      }

      throw new UnauthorizedException()
    }
  }

  public async create(data: UserCreateDto): Promise<User> {
    await this.validator.userCreatePayloadValidate(data)

    return this.repository.save(new User(data.name, data.documentNumber, data.email, data.password))
  }

  public async findOneByDocumentNumber(documentNumber: string): Promise<User> {
    return this.repository.findOneByDocumentNumber(documentNumber)
  }
}
