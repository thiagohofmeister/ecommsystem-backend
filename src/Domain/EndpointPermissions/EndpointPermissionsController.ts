import { NextFunction, Response } from 'express'

import { BaseController } from '../../Core/Controllers/BaseController'
import { ResponseTypeEnum } from '../../Core/Enums/ResponseTypeEnum'
import { CatalogRequest as CoreRequest } from '../../Core/Models/Request/CatalogRequest'
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
      this.defaultFacade(req).get(),
      ResponseTypeEnum.OK
    )
  }

  protected defaultView() {
    return new EndpointPermissionsView()
  }

  protected defaultFacade(req: CoreRequest) {
    return this.facadeFactory(req).buildEndpointPermissionsFacade()
  }
}
