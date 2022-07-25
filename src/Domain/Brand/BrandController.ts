import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { BrandFacade } from './BrandFacade'
import { BrandView } from './Views/BrandView'

export class BrandController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
    this.getOneById = this.getOneById.bind(this)
  }

  public async post(req: CatalogRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.defaultFacade(req).create(req.context.storeId, req.body),
      ResponseTypeEnum.CREATED
    )
  }

  public async get(req: CatalogRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.defaultFacade(req).list(req.query),
      ResponseTypeEnum.OK
    )
  }

  public async getOneById(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ) {
    await this.responseHandler(
      res,
      next,
      this.defaultFacade(req).getOneById(req.params.id),
      ResponseTypeEnum.OK
    )
  }

  protected defaultFacade(request: CatalogRequest): BrandFacade {
    return this.facadeFactory(request).buildBrandFacade()
  }

  protected defaultView() {
    return new BrandView()
  }
}
