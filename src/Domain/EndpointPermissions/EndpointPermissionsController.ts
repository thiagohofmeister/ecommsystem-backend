import { BaseController, CoreRequest, ResponseTypeEnum } from 'ecommsystem-core'
import { NextFunction, Response } from 'express'

import { Factory } from '../../Shared/Factories/Factory'
import { EndpointPermissionsView } from './Views/EndpointPermissionsView'

export class EndpointPermissionsController extends BaseController {
  constructor() {
    super()
    this.get = this.get.bind(this)
  }

  public async get(req: CoreRequest, res: Response, next: NextFunction) {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).get(),
      ResponseTypeEnum.OK
    )
  }

  protected getView() {
    return new EndpointPermissionsView()
  }

  protected getFacade(req: CoreRequest) {
    return Factory.getInstance()
      .buildFacadeFactory(req.context?.storeId)
      .buildEndpointPermissionsFacade()
  }
}
