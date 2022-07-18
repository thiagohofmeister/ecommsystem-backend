import { DataSource } from 'typeorm'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(
    private readonly dataSource: DataSource,
    private readonly dataMapperFactory: DataMapperFactory
  ) {}
}
