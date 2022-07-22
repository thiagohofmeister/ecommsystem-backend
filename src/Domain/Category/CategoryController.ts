import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { Factory } from '../../Core/Factories/Factory'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { CreatedResponse } from '../../Core/Models/Response/CreatedResponse'
import { OkResponse } from '../../Core/Models/Response/OkResponse'
import { CategoryTreeView } from './Views/CategoryTreeView'
import { CategoryView } from './Views/CategoryView'

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
      const facadeFactory = Factory.getInstance().buildFacadeFactory(
        request.context.storeId
      )

      const result = await facadeFactory
        .buildCategoryFacade()
        .create(request.context.storeId, request.body)

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
      const facadeFactory = Factory.getInstance().buildFacadeFactory(
        request.context.storeId
      )

      const result = await facadeFactory.buildCategoryFacade().getTree()

      this.successResponseHandler(
        new OkResponse(new CategoryTreeView().renderMany(result)),
        response
      )
    } catch (error) {
      next(error)
    }
  }
}
