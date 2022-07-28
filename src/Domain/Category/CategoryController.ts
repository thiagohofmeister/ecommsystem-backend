import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { CategoryFacade } from './CategoryFacade'
import { CategoryTreeView } from './Views/CategoryTreeView'
import { CategoryView } from './Views/CategoryView'

export class CategoryController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.patch = this.patch.bind(this)
    this.getTree = this.getTree.bind(this)
    this.getOneById = this.getOneById.bind(this)
  }

  public async post(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).create(req.context.storeId, req.body),
      ResponseTypeEnum.CREATED
    )
  }

  public async patch(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).update(
        req.params.id,
        req.context.storeId,
        req.body
      ),
      ResponseTypeEnum.CREATED
    )
  }

  public async getTree(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).getTree(),
      ResponseTypeEnum.OK,
      new CategoryTreeView()
    )
  }

  public async getOneById(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).getOneById(req.params.id),
      ResponseTypeEnum.OK
    )
  }

  protected defaultFacade(request: CatalogRequest): CategoryFacade {
    return this.facadeFactory(request).buildCategoryFacade()
  }

  protected defaultView() {
    return new CategoryView()
  }
}
