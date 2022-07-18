import { DataSource, EntityManager } from 'typeorm'
import { TransactionalService } from '../../Core/Services/TransactionalService'
import { ProductCreateService } from '../../Product/Services/ProductCreateService'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly dataSource: DataSource
  ) {}

  public createProductCreateService(manager?: EntityManager) {
    if (!manager) manager = this.dataSource.manager

    return new ProductCreateService()
  }

  public createTransactionalService() {
    return new TransactionalService(this.dataSource)
  }
}
