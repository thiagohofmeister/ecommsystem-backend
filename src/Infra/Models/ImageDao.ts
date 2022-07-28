import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { ProductDao } from './ProductDao'

@Entity('image')
export class ImageDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  url: string

  @Column()
  position: number

  @Column()
  value: string

  @ManyToOne(() => ProductDao, product => product.images, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn([
    {
      name: 'product_id'
    },
    {
      name: 'store_id'
    }
  ])
  product: ProductDao

  constructor(
    id: string,
    storeId: string,
    url: string,
    position: number,
    value: string,
    product?: ProductDao
  ) {
    this.id = id
    this.storeId = storeId
    this.url = url
    this.position = position
    this.value = value
    this.product = product
  }
}
