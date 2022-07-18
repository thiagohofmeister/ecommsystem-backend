import { Request } from 'express'
import { ApiContext } from '../Interfaces/ApiContext'

export interface CatalogRequest extends Request {
  context: ApiContext
}
