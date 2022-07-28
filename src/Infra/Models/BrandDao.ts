import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { ProductDao } from './ProductDao'

@Entity('brand')
export class BrandDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  label: string

  @Column()
  urn: string

  @Column()
  description: string

  @Column({
    name: 'created_at'
  })
  createdAt: Date

  @Column({
    name: 'updated_at'
  })
  updatedAt: Date

  @OneToMany(() => ProductDao, product => product.brand)
  @JoinColumn()
  products: ProductDao[]

  constructor(
    id: string,
    storeId: string,
    label: string,
    urn: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id
    this.storeId = storeId
    this.label = label
    this.urn = urn
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
