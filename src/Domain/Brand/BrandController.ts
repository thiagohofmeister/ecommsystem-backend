import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { Factory } from '../../Core/Factories/Factory'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { CreatedResponse } from '../../Core/Models/Response/CreatedResponse'
import { BrandView } from './Views/BrandView'

export class BrandController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
  }

  public async post(
    request: CatalogRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const facadeFactory = Factory.getInstance().buildFacadeFactory(
        request.context.storeId
      )

      const result = await facadeFactory
        .buildBrandFacade()
        .create(request.context.storeId, request.body)

      this.successResponseHandler(
        new CreatedResponse(new BrandView().render(result)),
        response
      )
    } catch (error) {
      next(error)
    }
  }
}
