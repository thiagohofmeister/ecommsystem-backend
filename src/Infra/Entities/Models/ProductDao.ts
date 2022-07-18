import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('product')
export class ProductDao {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column({
    name: 'price_list'
  })
  priceList: number

  @Column({
    name: 'price_sale'
  })
  priceSale: number

  constructor(
    title: string,
    priceList: number,
    priceSale: number,
    id?: string
  ) {
    this.title = title
    this.priceList = priceList
    this.priceSale = priceSale
    this.id = id
  }
}
