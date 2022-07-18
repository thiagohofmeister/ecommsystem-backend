import { Response, NextFunction } from 'express'
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
    request.context = {
      storeId: 'store-id'
    }

    next()
  }
}
