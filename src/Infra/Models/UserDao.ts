import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm'
import { UserStatusEnum } from '../../Domain/User/Enums/UserStatusEnum'
import { StoreDao } from './StoreDao'

@Entity('user')
export class UserDao {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({
    name: 'document_number'
  })
  documentNumber: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserStatusEnum
  })
  status: UserStatusEnum

  @OneToMany(() => StoreDao, store => store.owner)
  @JoinColumn({
    name: 'owner_id'
  })
  storesOwned: StoreDao[]

  @ManyToOne(() => StoreDao, store => store.customers)
  @JoinColumn({
    name: 'store_id'
  })
  store: StoreDao

  constructor(
    id: string,
    name: string,
    documentNumber: string,
    email: string,
    password: string,
    status: UserStatusEnum
  ) {
    this.id = id
    this.name = name
    this.documentNumber = documentNumber
    this.email = email
    this.password = password
    this.status = status
  }
}
