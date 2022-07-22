import { FindOptionsWhere, ObjectID } from 'typeorm'
import { IFilterDefault } from './IFilterDefault'
import { IItemListModel } from './IItemListModel'

export interface IRepository<TDomainEntity> {
  save(entity: TDomainEntity): Promise<TDomainEntity>
  findOneById(id: string): Promise<TDomainEntity>
  findAll(filter: IFilterDefault): Promise<IItemListModel<TDomainEntity>>
  delete(criteria: any): Promise<boolean>
}
