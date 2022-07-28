import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { MeasureUnitEnum } from '../../Domain/Product/Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../../Domain/Product/Enums/WeightUnitEnum'
import { ProductDao } from './ProductDao'

@Entity('variation')
export class VariationDao {
  @PrimaryColumn()
  sku: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  width: number

  @Column()
  length: number

  @Column()
  height: number

  @Column()
  weight: number

  @Column({
    name: 'measures_unit',
    type: 'enum',
    enum: MeasureUnitEnum
  })
  measuresUnit: MeasureUnitEnum

  @Column({
    name: 'weight_unit',
    type: 'enum',
    enum: WeightUnitEnum
  })
  weightUnit: WeightUnitEnum

  @Column({
    name: 'created_at'
  })
  createdAt: Date

  @Column({
    name: 'updated_at'
  })
  updatedAt: Date

  @ManyToOne(() => ProductDao, product => product.variations)
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
    sku: string,
    storeId: string,
    width: number,
    length: number,
    height: number,
    weight: number,
    measuresUnit: MeasureUnitEnum,
    weightUnit: WeightUnitEnum,
    product?: ProductDao
  ) {
    this.sku = sku
    this.storeId = storeId
    this.width = width
    this.length = length
    this.height = height
    this.weight = weight
    this.measuresUnit = measuresUnit
    this.weightUnit = weightUnit
    this.product = product
  }
}
