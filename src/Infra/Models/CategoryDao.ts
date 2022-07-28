import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm'
import { ProductDao } from './ProductDao'

@Entity('category')
export class CategoryDao {
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

  @ManyToOne(() => CategoryDao, category => category.parent)
  @JoinColumn({
    name: 'parent_id'
  })
  parent: CategoryDao

  @Column({
    name: 'created_at'
  })
  createdAt: Date

  @Column({
    name: 'updated_at'
  })
  updatedAt: Date

  @OneToMany(() => ProductDao, product => product.category)
  @JoinColumn()
  products: ProductDao[]

  constructor(
    id: string,
    storeId: string,
    label: string,
    urn: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
    parent?: CategoryDao
  ) {
    this.id = id
    this.storeId = storeId
    this.label = label
    this.urn = urn
    this.description = description
    this.createdAt = createdAt
    this.createdAt = createdAt
    this.parent = parent
  }
}
