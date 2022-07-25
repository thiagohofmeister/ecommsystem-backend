import { NextFunction, Response } from 'express'

import { ResponseTypeEnum } from '../Enums/ResponseTypeEnum'
import { Factory } from '../Factories/Factory'
import { CatalogRequest } from '../Models/Request/CatalogRequest'
import { AcceptedResponse } from '../Models/Response/AcceptedResponse'
import { CreatedResponse } from '../Models/Response/CreatedResponse'
import { NoContentResponse } from '../Models/Response/NoContentResponse'
import { OkResponse } from '../Models/Response/OkResponse'
import { SuccessContract } from '../Models/Response/SuccessContract'
import { ViewContract } from '../Views/Contracts/ViewContract'

export abstract class BaseController {
  constructor() {}

  protected async responseHandler(
    response: Response,
    next: NextFunction,
    promise: any,
    responseType: ResponseTypeEnum,
    view?: ViewContract
  ): Promise<void> {
    try {
      const body = await promise

      if (!view) {
        view = this.defaultView()
      }

      this.successResponseHandler(
        this.buildSuccessResponse(responseType, view.render(body)),
        response
      )
    } catch (error) {
      next(error)
    }
  }

  private successResponseHandler(result: SuccessContract, response: Response) {
    response.status(result.getStatus())

    if (result instanceof NoContentResponse) {
      response.send()
      return
    }

    response.json(result.getBody())
  }

  private buildSuccessResponse(
    responseType: ResponseTypeEnum,
    body: any
  ): SuccessContract {
    switch (responseType) {
      case ResponseTypeEnum.OK:
        return new OkResponse(body)

      case ResponseTypeEnum.CREATED:
        return new CreatedResponse(body)

      case ResponseTypeEnum.ACCEPTED:
        return new AcceptedResponse(body)

      case ResponseTypeEnum.NO_CONTENT:
        return new NoContentResponse()

      default:
        throw new Error(`Response type ${responseType} is not implemented.`)
    }
  }

  protected facadeFactory(request: CatalogRequest) {
    return Factory.getInstance().buildFacadeFactory(request.context.storeId)
  }

  protected abstract defaultView()

  protected abstract defaultFacade(request: CatalogRequest)
}
