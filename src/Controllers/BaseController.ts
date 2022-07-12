import { Response } from 'express'
import { NoContentResponse } from '../Entities/Domain/Response/NoContentResponse'
import { SuccessContract } from '../Entities/Domain/Response/SuccessContract'

export abstract class BaseController {
  protected successResponseHandler(result: SuccessContract, response: Response) {
    response.status(result.getStatus())

    if (result instanceof NoContentResponse) {
      response.send()
      return
    }

    response.json(result.getBody())
  }
}
