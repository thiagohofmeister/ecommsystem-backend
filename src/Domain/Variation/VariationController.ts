import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { StockView } from './Views/StockView'

export class VariationController extends BaseController {
  constructor() {
    super()
    this.putStocks = this.putStocks.bind(this)
  }

  public async putStocks(
    req: CatalogRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.defaultFacade(req).updateStocks(
        req.params.sku,
        req.context.storeId,
        req.body
      ),
      ResponseTypeEnum.OK,
      new StockView()
    )
  }

  protected defaultView() {
    return null
  }
  protected defaultFacade(request: CatalogRequest) {
    return this.facadeFactory(request).buildVariationFacade()
  }
}
