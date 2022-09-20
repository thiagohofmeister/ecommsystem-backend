import { DataNotFoundException, InvalidDataException } from 'ecommsystem-core'

import { StoreService } from '../Store/StoreService'
import { UserService } from '../User/UserService'
import { RegisterCreateDto } from './Dto/RegisterCreateDto'
import { Register } from './Models/Register'
import { RegisterValidator } from './RegisterValidator'

export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private readonly validator: RegisterValidator
  ) {}

  public async create(data: RegisterCreateDto) {
    await this.validator.registerCreatePayloadValidate(data)

    const invalidDataException = new InvalidDataException('Invalid data.')

    await this.validateIfUserAlreadyExists(
      data.user.documentNumber,
      invalidDataException
    )

    await this.validateIfStoreAlreadyExists(
      data.store.document.number,
      invalidDataException
    )

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }

    const user = await this.userService.create(data.user)

    const store = await this.storeService.create(user, data.store)

    return new Register(user, store)
  }

  private async validateIfUserAlreadyExists(
    documentNumber: string,
    invalidDataException: InvalidDataException
  ) {
    try {
      await this.userService.findOneByDocumentNumber(documentNumber)

      invalidDataException.addReason({
        id: `user.documentNumber.${documentNumber}.alreadyExists`,
        message: `Field user.documentNumber.${documentNumber} is already exists.`
      })
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) {
        throw e
      }
    }
  }

  private async validateIfStoreAlreadyExists(
    documentNumber: string,
    invalidDataException: InvalidDataException
  ) {
    try {
      await this.userService.findOneByDocumentNumber(documentNumber)

      invalidDataException.addReason({
        id: `store.document.number.${documentNumber}.alreadyExists`,
        message: `Field store.document.number.${documentNumber} is already exists.`
      })
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) {
        throw e
      }
    }
  }
}
