import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { VariationAttributeDao } from './VariationAttributeDao'

@Entity('attribute')
export class AttributeDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  label: string

  @Column('json')
  values: string

  @OneToMany(() => VariationAttributeDao, attribute => attribute.attribute)
  variationAttributes: VariationAttributeDao[]

  constructor(id: string, storeId: string, label: string, values: string) {
    this.id = id
    this.storeId = storeId
    this.label = label
    this.values = values
  }
}
