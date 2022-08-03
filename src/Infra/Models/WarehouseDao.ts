import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { ProductDao } from './ProductDao'
import { StockDao } from './StockDao'

@Entity('warehouse')
export class WarehouseDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  name: string

  @Column({
    name: 'address_zip_code'
  })
  addressZipCode: string

  @Column({
    name: 'address_state'
  })
  addressState: string

  @Column({
    name: 'address_city'
  })
  addressCity: string

  @Column({
    name: 'address_district'
  })
  addressDistrict: string

  @Column({
    name: 'address_street'
  })
  addressStreet: string

  @Column({
    name: 'address_number'
  })
  addressNumber: string

  @Column({
    name: 'address_complement'
  })
  addressComplement: string

  @Column()
  priority: number

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

  @OneToMany(() => StockDao, stock => stock.warehouse)
  stocks: StockDao[]

  constructor(
    id: string,
    storeId: string,
    name: string,
    addressZipCode: string,
    addressState: string,
    addressCity: string,
    addressDistrict: string,
    addressStreet: string,
    addressNumber: string,
    addressComplement: string,
    priority: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id
    this.storeId = storeId
    this.name = name
    this.addressZipCode = addressZipCode
    this.addressState = addressState
    this.addressCity = addressCity
    this.addressDistrict = addressDistrict
    this.addressStreet = addressStreet
    this.addressNumber = addressNumber
    this.addressComplement = addressComplement
    this.priority = priority
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
