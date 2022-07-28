import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { AttributeDao } from './AttributeDao'
import { VariationDao } from './VariationDao'

@Entity('variation_attribute')
export class VariationAttributeDao {
  @PrimaryColumn({
    name: 'variation_sku'
  })
  variationSku: string

  @PrimaryColumn({
    name: 'attribute_id'
  })
  attributeId: string

  @Column({
    name: 'store_id',
    update: true
  })
  storeId: string

  @Column()
  value: string

  @ManyToOne(() => VariationDao, variation => variation.variationAttributes)
  @JoinColumn([
    {
      name: 'variation_sku'
    },
    {
      name: 'store_id'
    }
  ])
  variation: VariationDao

  @ManyToOne(() => AttributeDao, attribute => attribute.variationAttributes)
  @JoinColumn({
    name: 'attribute_id'
  })
  attribute: AttributeDao

  constructor(
    storeId: string,
    value: string,
    variation?: VariationDao,
    attribute?: AttributeDao
  ) {
    this.storeId = storeId
    this.value = value
    this.variation = variation
    this.attribute = attribute
    this.attributeId = attribute?.id
    this.variationSku = variation?.sku
  }
}
