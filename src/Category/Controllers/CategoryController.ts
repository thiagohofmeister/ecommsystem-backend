import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { Factory } from '../../Core/Factories/Factory'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { CreatedResponse } from '../../Core/Models/Response/CreatedResponse'
import { CategoryTreeView } from '../Views/CategoryTreeView'
import { CategoryView } from '../Views/CategoryView'

export class CategoryController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.getTree = this.getTree.bind(this)
  }

  public async post(
    request: CatalogRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceFactory = Factory.getInstance().buildServiceFactory()

      const result = await serviceFactory
        .buildTransactionalService()
        .execute(async manager => {
          const categoryCreateService =
            serviceFactory.buildCategoryCreateService(manager)

          return await categoryCreateService.execute(
            request.context.storeId,
            request.body
          )
        })

      this.successResponseHandler(
        new CreatedResponse(new CategoryView().render(result)),
        response
      )
    } catch (error) {
      next(error)
    }
  }

  public async getTree(
    request: CatalogRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceFactory = Factory.getInstance().buildServiceFactory()

      const categoryCreateService = serviceFactory.buildCategoryGetTreeService()

      const result = await categoryCreateService.execute()

      this.successResponseHandler(
        new CreatedResponse(new CategoryTreeView().renderMany(result)),
        response
      )
    } catch (error) {
      next(error)
    }
  }
}
