/**
 * Pricing Service for Dairy Konnect WebApp
 * Fetches public milk pricing data from various dairies
 */

import { BaseService } from './BaseService'

// API Base URL for pricing service
const PRICING_API_BASE = import.meta.env.VITE_PRICING_API_BASE || 'http://localhost:5001/api/v1'

// Types
export type MilkType = 'Cow' | 'Buffalo' | 'Mixed'

export interface RateCard {
  id: string
  dairyId: string
  name: string
  milkType: MilkType
  pricingMethod: 'fat_snf' | 'slab'
  basePrice: number | null
  fatRate: number | null
  snfRate: number | null
  effectiveFrom: string
  effectiveTo: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface DairyRates {
  dairyId: string
  dairyName?: string
  village?: string
  ownerName?: string
  rateCards: RateCard[]
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Default FAT/SNF ranges for different milk types
export const MILK_RANGES = {
  Cow: { fatRange: [3.0, 5.0], snfRange: [8.0, 9.0] },
  Buffalo: { fatRange: [6.0, 8.5], snfRange: [8.5, 9.5] },
  Mixed: { fatRange: [4.0, 7.0], snfRange: [8.0, 9.0] },
}

// Calculate price using FAT+SNF formula
export function calculatePrice(
  basePrice: number,
  fatRate: number,
  snfRate: number,
  fat: number,
  snf: number
): number {
  return basePrice + (fat * fatRate * 10) + (snf * snfRate * 10)
}

// Generate price table for a rate card
export function generatePriceTable(rateCard: RateCard): { fatValues: number[], snfValues: number[], prices: number[][] } {
  const ranges = MILK_RANGES[rateCard.milkType] || MILK_RANGES.Cow
  const fatValues: number[] = []
  const snfValues: number[] = []
  
  for (let f = ranges.fatRange[0]; f <= ranges.fatRange[1]; f += 0.5) {
    fatValues.push(f)
  }
  
  for (let s = ranges.snfRange[0]; s <= ranges.snfRange[1]; s += 0.5) {
    snfValues.push(s)
  }
  
  const prices: number[][] = []
  for (const fat of fatValues) {
    const row: number[] = []
    for (const snf of snfValues) {
      const price = calculatePrice(
        rateCard.basePrice || 0,
        rateCard.fatRate || 0,
        rateCard.snfRate || 0,
        fat,
        snf
      )
      row.push(Math.round(price))
    }
    prices.push(row)
  }
  
  return { fatValues, snfValues, prices }
}

class PricingService extends BaseService {
  constructor() {
    super()
    this.baseURL = PRICING_API_BASE
  }

  /**
   * Get all public dairy rates
   */
  async getAllDairyRates(milkType?: MilkType): Promise<DairyRates[]> {
    let url = '/dairy/public/all-rates'
    if (milkType) {
      url += `?milk_type=${milkType}`
    }
    const response = await this.get<ApiResponse<DairyRates[]>>(url)
    return response.data || []
  }

  /**
   * Get rate cards for a specific dairy
   */
  async getDairyRates(dairyId: string, milkType?: MilkType): Promise<RateCard[]> {
    let url = `/dairy/public/${dairyId}/rate-cards`
    if (milkType) {
      url += `?milk_type=${milkType}`
    }
    const response = await this.get<ApiResponse<RateCard[]>>(url)
    return response.data || []
  }

  /**
   * Calculate price for specific FAT/SNF values
   */
  async calculatePrice(
    dairyId: string,
    milkType: MilkType,
    fat: number,
    snf: number,
    quantity?: number
  ): Promise<{
    pricePerLiter: number
    totalAmount?: number
    rateCardName: string
  }> {
    const response = await this.post<ApiResponse<{
      pricePerLiter: number
      totalAmount?: number
      rateCardName: string
    }>>('/dairy/calculate', {
      dairyId,
      milkType,
      fat,
      snf,
      quantity
    })
    return response.data
  }
}

export const pricingService = new PricingService()
export default pricingService
