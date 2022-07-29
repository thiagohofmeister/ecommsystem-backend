import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { PriceView } from './Views/PriceView'
import { ProductView } from './Views/ProductView'

export class ProductController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.patch = this.patch.bind(this)
    this.putPrices = this.putPrices.bind(this)
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

  public async patch(
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

  public async putPrices(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).updatePrices(
        req.params.id,
        req.context.storeId,
        req.body
      ),
      ResponseTypeEnum.OK,
      new PriceView()
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
