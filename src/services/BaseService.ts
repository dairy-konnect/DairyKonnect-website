import { API_BASE } from '../constants/api.constant'

export interface ApiRequestConfig {
  headers?: Record<string, string>
  timeout?: number
}

export class BaseService {
  protected baseURL: string
  protected defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = API_BASE
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {},
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const headers = {
      ...this.defaultHeaders,
      ...config.headers,
      ...options.headers,
    }

    const requestOptions: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, requestOptions)

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data?.message || data?.detail || `HTTP error! status: ${response.status}`
        throw new Error(errorMessage)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }

  protected async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, config)
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    )
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    )
  }

  protected async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, config)
  }
}