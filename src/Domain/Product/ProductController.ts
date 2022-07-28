import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { ProductView } from './Views/ProductView'

export class ProductController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.update = this.update.bind(this)
    this.getOneById = this.getOneById.bind(this)
    this.getList = this.getList.bind(this)
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

  public async update(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).update(req.params.id, req.body),
      ResponseTypeEnum.OK
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

  public async getList(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).getList(req.query),
      ResponseTypeEnum.OK
    )
  }

  protected defaultView() {
    return new ProductView()
  }
  protected defaultFacade(request: CatalogRequest) {
    return this.facadeFactory(request).buildProductFacade()
  }
}
