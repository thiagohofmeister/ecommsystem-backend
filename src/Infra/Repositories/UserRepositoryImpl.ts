import { createHash } from 'crypto'
import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { User } from '../../Domain/User/Models/User'
import { UserRepository } from '../../Domain/User/Repositories/UserRepository'
import { UserDao } from '../Models/UserDao'

export class UserRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<User, UserDao>
  implements UserRepository
{
  async findOneByAuthData(login: string, password: string): Promise<User> {
    const user = await this.repository
      .createQueryBuilder()
      .leftJoinAndSelect('UserDao.storesOwned', 'storesOwned')
      .leftJoinAndSelect('UserDao.store', 'store')
      .where(
        '(UserDao.email = :login or UserDao.document_number = :password)',
        { login }
      )
      .andWhere('UserDao.password = :password', {
        password: this.createHash256(this.createHash256(password))
      })
      .getOne()

    if (!user) {
      throw this.dataNotFoundException
    }

    return this.dataMapper.toDomainEntity(user)
  }

  async findOneByDocumentNumber(documentNumber: string): Promise<User> {
    const user = await this.repository.findOne({ where: { documentNumber } })

    if (!user) {
      throw this.dataNotFoundException
    }

    return this.dataMapper.toDomainEntity(user)
  }

  private createHash256(str: string): string {
    return createHash('sha256').update(str).digest('hex')
  }
}
