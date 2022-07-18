import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'
import { IFilterDefault } from '../../../Shared/Models/Interfaces/IFilterDefault'
import { IItemListModel } from '../../../Shared/Models/Interfaces/IItemListModel'
import { IRepository } from '../../../Shared/Models/Interfaces/IRepository'

export abstract class RepositoryContract<TDomainEntity, TDaoEntity>
  implements IRepository<TDomainEntity>
{
  constructor(protected dataNotFoundException: DataNotFoundException) {}

  abstract save(entity: TDomainEntity): Promise<TDomainEntity>

  abstract findOneById(id: string): Promise<TDomainEntity>

  abstract findAll(
    filter: IFilterDefault
  ): Promise<IItemListModel<TDomainEntity>>
}
