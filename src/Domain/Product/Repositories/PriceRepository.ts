import { IRepository } from 'ecommsystem-core'
import { Price } from '../Models/Price'

export interface PriceRepository extends IRepository<Price> {
  findBySkuAndCampaignId(sku: string, campaignId: string): Promise<Price>
}
