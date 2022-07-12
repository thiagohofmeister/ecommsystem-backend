import { Repository as TypeOrmRepository, SelectQueryBuilder } from "typeorm";
import { EntityDataMapperContract } from "../../DataMappers/Contracts/EntityDataMapperContract";
import { DataNotFoundException } from "../../Entities/Domain/Exceptions/DataNotFoundException";
import { IFilterDefault } from "../../Entities/Domain/Interfaces/IFilterDefault";
import { IItemListModel } from "../../Entities/Domain/Interfaces/IItemListModel";
import { RepositoryContract } from "./RepositoryContract";

export abstract class TypeOrmMysqlRepositoryContract<
  TDomainEntity,
  TDaoEntity
> extends RepositoryContract<TDomainEntity, TDaoEntity> {
  constructor(
    protected readonly repository: TypeOrmRepository<TDaoEntity>,
    protected dataMapper: EntityDataMapperContract<TDomainEntity, TDaoEntity>,
    dataNotFoundException: DataNotFoundException
  ) {
    super(dataNotFoundException);
  }

  public async save(entity: TDomainEntity): Promise<TDomainEntity> {
    const result = await this.repository.save(
      this.getDaoEntityByDomainEntity(entity)
    );

    return this.getDomainEntityByDaoEntity(result);
  }

  public async findAll<TFilter extends IFilterDefault>(
    filter: TFilter
  ): Promise<IItemListModel<TDomainEntity>> {
    const query = this.applyPaginator(
      filter,
      this.customToFindAll(filter, this.repository.createQueryBuilder())
    );

    return {
      items: this.dataMapper.toDomainMany(await query.getMany()),
      total: await query.getCount(),
    };
  }

  public applyPaginator(
    filter: IFilterDefault,
    query: SelectQueryBuilder<TDaoEntity>
  ): SelectQueryBuilder<TDaoEntity> {
    const skip = (this.getPage(filter) - 1) * this.getSize(filter);
    const size = this.getSize(filter);

    return query.skip(skip).take(size);
  }

  protected getPage(filter: IFilterDefault) {
    filter.page =
      typeof filter.page === "string" ? parseInt(filter.page) : filter.page;

    let page = 1;
    if (filter.page > 0) {
      page =
        typeof filter.page === "string" ? parseInt(filter.page) : filter.page;
    }

    return page;
  }

  protected getSize(filter: IFilterDefault) {
    filter.size =
      typeof filter.size === "string" ? parseInt(filter.size) : filter.size;

    let size = 15;
    if (filter.size > 0) {
      size = filter.size;
      if (filter.size > 100) {
        size = 100;
      }
    }

    return size;
  }

  protected customToFindAll(
    filter: IFilterDefault,
    query: SelectQueryBuilder<TDaoEntity>
  ): SelectQueryBuilder<TDaoEntity> {
    return query;
  }

  protected getDaoEntityByDomainEntity(domain: TDomainEntity): TDaoEntity {
    return this.dataMapper.toDaoEntity(domain);
  }

  protected getDomainEntityByDaoEntity(dao: TDaoEntity): TDomainEntity {
    return this.dataMapper.toDomainEntity(dao);
  }
}
