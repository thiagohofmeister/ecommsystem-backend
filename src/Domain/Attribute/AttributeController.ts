import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { AttributeFacade } from './AttributeFacade'
import { AttributeView } from './Views/AttributeView'

export class AttributeController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.patch = this.patch.bind(this)
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

  public async patch(req: CatalogRequest, res: Response, next: NextFunction) {
    await this.responseHandler(
      res,
      next,
      this.defaultFacade(req).update(
        req.params.id,
        req.context.storeId,
        req.body
      ),
      ResponseTypeEnum.OK
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

  protected defaultFacade(request: CatalogRequest): AttributeFacade {
    return this.facadeFactory(request).buildAttributeFacade()
  }

  protected defaultView() {
    return new AttributeView()
  }
}
