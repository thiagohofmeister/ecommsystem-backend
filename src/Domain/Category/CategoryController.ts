import { BaseController, CoreRequest, ResponseTypeEnum } from 'ecommsystem-core'
import { NextFunction, Response } from 'express'
import { Factory } from '../../Shared/Factories/Factory'

import { CategoryFacade } from './CategoryFacade'
import { CategoryTreeView } from './Views/CategoryTreeView'
import { CategoryView } from './Views/CategoryView'

export class CategoryController extends BaseController {
  constructor() {
    super()
    this.post = this.post.bind(this)
    this.patch = this.patch.bind(this)
    this.getTree = this.getTree.bind(this)
    this.getOneById = this.getOneById.bind(this)
  }

  public async post(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).create(req.context.storeId, req.body),
      ResponseTypeEnum.CREATED
    )
  }

  public async patch(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).update(req.params.id, req.context.storeId, req.body),
      ResponseTypeEnum.CREATED
    )
  }

  public async getTree(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).getTree(),
      ResponseTypeEnum.OK,
      new CategoryTreeView()
    )
  }

  public async getOneById(
    req: CoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.responseHandler(
      res,
      next,
      this.getFacade(req).getOneById(req.params.id),
      ResponseTypeEnum.OK
    )
  }

  protected getFacade(req: CoreRequest): CategoryFacade {
    return Factory.getInstance()
      .buildFacadeFactory(req.context?.storeId)
      .buildCategoryFacade()
  }

  protected getView() {
    return new CategoryView()
  }
}
