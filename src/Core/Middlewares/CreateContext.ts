import { Response, NextFunction } from 'express'
import { BadRequestException } from '../Models/Exceptions/BadRequestException'
import { CatalogRequest } from '../Models/Request/CatalogRequest'

export class CreateContext {
  constructor() {
    this.create = this.create.bind(this)
  }

  public create(
    request: CatalogRequest,
    response: Response,
    next: NextFunction
  ) {
    if (!request.header('PLATFORM-STORE-ID')) {
      next(new BadRequestException('Store ID is required.'))
    }

    request.context = {
      storeId: request.header('PLATFORM-STORE-ID')
    }

    next()
  }
}
