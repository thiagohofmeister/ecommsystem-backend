import { DataNotFoundException } from "../../Entities/Domain/Exceptions/DataNotFoundException";

export abstract class RepositoryContract<TDomainEntity, TDaoEntity> {
  constructor(protected dataNotFoundException: DataNotFoundException) {}
}
