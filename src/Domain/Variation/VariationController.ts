import { BaseController, CoreRequest, ResponseTypeEnum } from 'ecommsystem-core'
import { NextFunction, Response } from 'express'

import { Factory } from '../../Shared/Factories/Factory'
import { StockView } from './Views/StockView'

export class VariationController extends BaseController {
  constructor() {
    super()
    this.putStocks = this.putStocks.bind(this)
  }

  public async putStocks(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).updateStocks(
        req.params.sku,
        req.context.storeId,
        req.body
      ),
      ResponseTypeEnum.OK,
      new StockView()
    )
  }

  protected getView() {
    return null
  }

  protected getFacade(req: CoreRequest) {
    return Factory.getInstance()
      .buildFacadeFactory(req.context?.storeId)
      .buildVariationFacade()
  }
}
