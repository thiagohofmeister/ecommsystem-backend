import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../Core/Controllers/BaseController'
import { Factory } from '../../Core/Factories/Factory'
import { OkResponse } from '../../Core/Models/Response/OkResponse'

export class ProductController extends BaseController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceFactory = Factory.getInstance().buildServiceFactory()

      const result = await serviceFactory
        .createTransactionalService()
        .execute(async manager => {
          const productCreateService =
            serviceFactory.createProductCreateService(manager)

          return await productCreateService.execute(request.body)
        })

      this.successResponseHandler(new OkResponse(result), response)
    } catch (error) {
      next(error)
    }
  }
}
