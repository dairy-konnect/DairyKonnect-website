import type { BaseEntity } from './common'

export interface Transaction extends BaseEntity {
  transactionType: TransactionType
  sellerId: string
  sellerName: string
  dairyId: string
  milkQuantity: number // in liters
  pricePerLiter: number
  totalAmount: number
  fat: number // fat percentage
  snf: number // solid not fat percentage
  quality: QualityGrade
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  notes?: string
  billNumber?: string
  date: string
}

export type TransactionType = 'purchase' | 'sale' | 'return'
export type QualityGrade = 'A+' | 'A' | 'B+' | 'B' | 'C'
export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'overdue'
export type PaymentMethod = 'cash' | 'bank_transfer' | 'cheque' | 'digital'

export interface TransactionSummary {
  totalTransactions: number
  totalQuantity: number
  totalAmount: number
  averagePrice: number
  pendingPayments: number
}

export interface TransactionFilters {
  dateFrom?: string
  dateTo?: string
  sellerId?: string
  transactionType?: TransactionType
  paymentStatus?: PaymentStatus
  qualityGrade?: QualityGrade
}

export interface MilkPricing {
  basePrice: number
  fatRate: number // price per fat percentage
  snfRate: number // price per SNF percentage
  qualityBonus: Record<QualityGrade, number>
}

export interface Bill extends BaseEntity {
  billNumber: string
  transactionIds: string[]
  sellerId: string
  totalAmount: number
  paidAmount: number
  dueAmount: number
  dueDate: string
  status: PaymentStatus
  generatedBy: string
}