import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { VariationDao } from './VariationDao'

@Entity('price')
export class PriceDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  list: number

  @Column()
  sale: number

  @Column({
    name: 'created_at'
  })
  createdAt: Date

  @Column({
    name: 'updated_at'
  })
  updatedAt: Date

  @ManyToOne(() => VariationDao, variation => variation.prices)
  @JoinColumn({
    name: 'variation_sku'
  })
  variation: VariationDao

  constructor(
    id: string,
    storeId: string,
    list: number,
    sale: number,
    createdAt: Date
  ) {
    this.id = id
    this.storeId = storeId
    this.list = list
    this.sale = sale
    this.createdAt = createdAt
  }
}
