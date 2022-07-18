import { Response } from 'express'
import { NoContentResponse } from '../Models/Response/NoContentResponse'
import { SuccessContract } from '../Models/Response/SuccessContract'

export abstract class BaseController {
  constructor() {}

  protected successResponseHandler(
    result: SuccessContract,
    response: Response
  ) {
    response.status(result.getStatus())

    if (result instanceof NoContentResponse) {
      response.send()
      return
    }

    response.json(result.getBody())
  }
}
