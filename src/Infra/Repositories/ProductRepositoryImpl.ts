import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { Product } from '../../Domain/Product/Models/Product'
import { ProductRepository } from '../../Domain/Product/Repositories/ProductRepository'
import { ProductDao } from '../Models/ProductDao'

export class ProductRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Product, ProductDao>
  implements ProductRepository
{
  async findOneById(id: string): Promise<Product> {
    const product = await this.repository.findOne({ where: { id } })

    if (!product) throw this.dataNotFoundException

    return this.dataMapper.toDomainEntity(product)
  }
}
