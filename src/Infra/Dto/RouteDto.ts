import { NextFunction, Response } from 'express'
import { CatalogRequest } from '../../Core/Models/Request/CatalogRequest'
import { MethodEnum } from '../Routes/Enums/MethodEnum'

export class RouteDto {
  constructor(
    private readonly path: string,
    private readonly method: MethodEnum,
    private readonly handle: (
      request: CatalogRequest,
      response: Response,
      next: NextFunction
    ) => void
  ) {}

  public getPath() {
    return this.path
  }

  public getMethod() {
    return this.method
  }

  public getHandle() {
    return this.handle
  }
}
