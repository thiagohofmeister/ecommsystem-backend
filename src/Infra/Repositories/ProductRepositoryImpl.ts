import { SelectQueryBuilder } from 'typeorm'
import { IFilterDefault } from '../../Core/Models/Interfaces/IFilterDefault'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { Product } from '../../Domain/Product/Models/Product'
import { ProductRepository } from '../../Domain/Product/Repositories/ProductRepository'
import { ProductDao } from '../Models/ProductDao'

export class ProductRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Product, ProductDao>
  implements ProductRepository
{
  protected customToFindOneByPrimaryColumn(
    query: SelectQueryBuilder<ProductDao>
  ): SelectQueryBuilder<ProductDao> {
    return query
      .leftJoinAndSelect('ProductDao.category', 'category')
      .leftJoinAndSelect('ProductDao.variations', 'variations')
      .leftJoinAndSelect('ProductDao.brand', 'brand')
  }

  protected customToFindAll(
    filter: IFilterDefault,
    query: SelectQueryBuilder<ProductDao>
  ): SelectQueryBuilder<ProductDao> {
    return query
      .leftJoinAndSelect('ProductDao.category', 'category')
      .leftJoinAndSelect('ProductDao.variations', 'variations')
      .leftJoinAndSelect('ProductDao.brand', 'brand')
  }
}
