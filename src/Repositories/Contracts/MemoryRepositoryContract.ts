import { DataNotFoundException } from "../../Entities/Domain/Exceptions/DataNotFoundException";
import { IItemListModel } from "../../Entities/Domain/Interfaces/IItemListModel";
import { RepositoryContract } from "./RepositoryContract";

export abstract class MemoryRepositoryContract<
  TDomainEntity
> extends RepositoryContract<TDomainEntity, any> {
  protected data: TDomainEntity[];

  constructor(dataNotFoundException: DataNotFoundException) {
    super(dataNotFoundException);

    this.data = [];
  }

  public async save(entity: TDomainEntity): Promise<TDomainEntity> {
    const index = this.getDataIndex(entity);

    if (index >= 0) {
      this.data[index] = entity;
    } else {
      this.data.push(entity);
    }

    return entity;
  }

  public async findAll(): Promise<IItemListModel<TDomainEntity>> {
    return {
      items: this.data,
      total: this.data.length,
    };
  }

  protected abstract getDataIndex(entity: TDomainEntity): number;
}
