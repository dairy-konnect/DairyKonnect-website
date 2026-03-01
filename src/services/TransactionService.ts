import { BaseService } from './BaseService'
import type { 
  Transaction,
  TransactionSummary,
  TransactionFilters,
  Bill 
} from '../@types/transaction'
import type { ApiResponse, PaginatedResponse, PaginationParams } from '../@types/common'

export class TransactionService extends BaseService {
  async getTransactions(
    filters?: TransactionFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Transaction>> {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
    }
    
    if (pagination) {
      Object.entries(pagination).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
    }

    const queryString = params.toString()
    const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`
    
    const response = await this.get<ApiResponse<PaginatedResponse<Transaction>>>(endpoint)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to fetch transactions')
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const response = await this.get<ApiResponse<Transaction>>(`/transactions/${id}`)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Transaction not found')
  }

  async createTransaction(transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const response = await this.post<ApiResponse<Transaction>>('/transactions', transactionData)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to create transaction')
  }

  async updateTransaction(id: string, transactionData: Partial<Transaction>): Promise<Transaction> {
    const response = await this.put<ApiResponse<Transaction>>(`/transactions/${id}`, transactionData)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to update transaction')
  }

  async deleteTransaction(id: string): Promise<void> {
    const response = await this.delete<ApiResponse<void>>(`/transactions/${id}`)
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete transaction')
    }
  }

  async getTransactionSummary(filters?: TransactionFilters): Promise<TransactionSummary> {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
    }

    const queryString = params.toString()
    const endpoint = `/transactions/summary${queryString ? `?${queryString}` : ''}`
    
    const response = await this.get<ApiResponse<TransactionSummary>>(endpoint)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to fetch transaction summary')
  }

  async generateBill(transactionIds: string[]): Promise<Bill> {
    const response = await this.post<ApiResponse<Bill>>('/transactions/generate-bill', {
      transactionIds
    })
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to generate bill')
  }

  async getBills(pagination?: PaginationParams): Promise<PaginatedResponse<Bill>> {
    const params = new URLSearchParams()
    
    if (pagination) {
      Object.entries(pagination).forEach(([key, value]) => {
        if (value) params.append(key, String(value))
      })
    }

    const queryString = params.toString()
    const endpoint = `/bills${queryString ? `?${queryString}` : ''}`
    
    const response = await this.get<ApiResponse<PaginatedResponse<Bill>>>(endpoint)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Failed to fetch bills')
  }
}

export const transactionService = new TransactionService()