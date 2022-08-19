import { BaseController, CoreRequest, ResponseTypeEnum } from 'ecommsystem-core'
import { NextFunction, Response } from 'express'

import { Factory } from '../../Shared/Factories/Factory'
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
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).create(req.context.storeId, req.body),
      ResponseTypeEnum.CREATED
    )
  }

  public async patch(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).update(req.params.id, req.body),
      ResponseTypeEnum.OK
    )
  }

  public async putPrices(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).updatePrices(
        req.params.id,
        req.context.storeId,
        req.body
      ),
      ResponseTypeEnum.OK,
      new PriceView()
    )
  }

  public async getOneById(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).getOneById(req.params.id),
      ResponseTypeEnum.OK
    )
  }

  public async getList(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).getList(req.query),
      ResponseTypeEnum.OK
    )
  }

  protected getView() {
    return new ProductView()
  }

  protected getFacade(req: CoreRequest) {
    return Factory.getInstance()
      .buildFacadeFactory(req.context?.storeId)
      .buildProductFacade()
  }
}
