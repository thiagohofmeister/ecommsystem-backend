import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { CategoryDao } from './CategoryDao'

@Entity('product')
export class ProductDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id'
  })
  storeId: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  active: boolean

  @ManyToOne(() => CategoryDao, category => category.products)
  @JoinColumn({
    name: 'category_id'
  })
  category?: CategoryDao

  @Column({
    name: 'created_at'
  })
  createdAt: Date

  @Column({
    name: 'updated_at'
  })
  updatedAt: Date

  constructor(
    id: string,
    storeId: string,
    title: string,
    description: string,
    active: boolean,
    createdAt: Date
  ) {
    this.id = id
    this.storeId = storeId
    this.title = title
    this.description = description
    this.active = active
    this.createdAt = createdAt
  }
}
