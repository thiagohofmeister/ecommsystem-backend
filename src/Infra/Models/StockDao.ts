import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { VariationDao } from './VariationDao'
import { WarehouseDao } from './WarehouseDao'

@Entity('stock')
export class StockDao {
  @PrimaryColumn({
    name: 'variation_sku',
    update: false
  })
  variationSku: string

  @PrimaryColumn({
    name: 'warehouse_id',
    update: false
  })
  warehouseId: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  quantity: number

  @ManyToOne(() => VariationDao, variation => variation.stocks)
  @JoinColumn([
    {
      name: 'variation_sku'
    },
    {
      name: 'store_id'
    }
  ])
  variation: VariationDao

  @ManyToOne(() => WarehouseDao, warehouse => warehouse.stocks)
  @JoinColumn({
    name: 'warehouse_id'
  })
  warehouse: WarehouseDao

  constructor(
    storeId: string,
    quantity: number,
    variation?: VariationDao,
    warehouse?: WarehouseDao
  ) {
    this.storeId = storeId
    this.quantity = quantity
    this.variation = variation
    this.warehouse = warehouse
    this.warehouseId = warehouse?.id
    this.variationSku = variation?.sku
  }
}
