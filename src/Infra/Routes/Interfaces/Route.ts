import { NextFunction, Response } from 'express'
import { CatalogRequest } from '../../../Core/Models/Request/CatalogRequest'
import { MethodEnum } from '../Enums/MethodEnum'

export interface Route {
  path: string
  method: MethodEnum
  handle: (
    request: CatalogRequest,
    response: Response,
    next: NextFunction
  ) => void
}
