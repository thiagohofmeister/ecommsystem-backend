import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

import { DocumentTypeEnum } from '../../Domain/Store/Enums/DocumentTypeEnum'
import { UserDao } from './UserDao'

@Entity('store')
export class StoreDao {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({
    name: 'document_type',
    type: 'enum',
    enum: DocumentTypeEnum
  })
  documentType: DocumentTypeEnum

  @Column({
    name: 'document_number'
  })
  documentNumber: string

  @Column({
    name: 'document_name'
  })
  documentName: string

  @Column()
  email: string

  @Column()
  phone: string

  @ManyToOne(() => UserDao, user => user.storesOwned)
  @JoinColumn({
    name: 'owner_id'
  })
  owner: UserDao

  @OneToMany(() => UserDao, user => user.store)
  @JoinColumn({
    name: 'store_id'
  })
  customers: UserDao[]

  constructor(
    id: string,
    name: string,
    documentType: DocumentTypeEnum,
    documentNumber: string,
    documentName: string,
    email: string,
    phone: string,
    user?: UserDao
  ) {
    this.id = id
    this.name = name
    this.documentType = documentType
    this.documentNumber = documentNumber
    this.documentName = documentName
    this.email = email
    this.phone = phone
    this.owner = user
  }
}
