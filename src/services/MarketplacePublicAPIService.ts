/**
 * Public livestock marketplace API (no auth).
 * Paths are relative to `appConfig.apiPrefix` (e.g. `/api/v1`).
 */
import ApiService from './ApiService'

export type MarketplaceListingType = 'sell' | 'buy'

export interface AnimalListingOut {
  id: string
  seller_id: string
  seller_name: string
  listing_type: MarketplaceListingType
  title: string
  animal_type: string
  breed: string | null
  age_months: number | null
  quantity: number
  price_inr: number | null
  price_negotiable: boolean
  description: string
  location_text: string
  pincode: string | null
  latitude: number | null
  longitude: number | null
  contact_phone: string
  prefer_whatsapp_video: boolean
  image_urls: string[]
  status: string
  created_at: string
  updated_at: string
  is_owner: boolean
  contact_locked: boolean
  is_saved: boolean
}

export interface AnimalListingListOut {
  items: AnimalListingOut[]
  total: number
  skip: number
  limit: number
}

interface ApiEnvelope<T> {
  success: boolean
  message?: string
  data?: T
}

function unwrap<T>(body: ApiEnvelope<T>): T {
  if (!body.success || body.data === undefined) {
    throw new Error(body.message || 'Request failed')
  }
  return body.data
}

/** Normalizes to a path or returns absolute URLs unchanged. */
export function resolveListingMediaUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ''
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  return pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
}

export interface FetchPublicListingsParams {
  listingType?: MarketplaceListingType | 'all'
  skip?: number
  limit?: number
  lat?: number
  lng?: number
  maxKm?: number
}

export class MarketplacePublicAPIService {
  static async getPublicListings(params: FetchPublicListingsParams = {}): Promise<AnimalListingListOut> {
    const { listingType = 'all', skip = 0, limit = 24, lat, lng, maxKm } = params
    const qs = new URLSearchParams()
    qs.set('skip', String(skip))
    qs.set('limit', String(Math.min(50, Math.max(1, limit))))
    if (listingType === 'sell' || listingType === 'buy') qs.set('listing_type', listingType)
    if (lat != null && lng != null && maxKm != null && maxKm > 0) {
      qs.set('lat', String(lat))
      qs.set('lng', String(lng))
      qs.set('max_km', String(Math.min(500, maxKm)))
    }

    const response = await ApiService.fetchData<ApiEnvelope<AnimalListingListOut>>({
      url: `/marketplace/public/listings?${qs.toString()}`,
      method: 'get',
    })

    return unwrap(response.data)
  }

  static async getPublicListing(id: string): Promise<AnimalListingOut> {
    const response = await ApiService.fetchData<ApiEnvelope<AnimalListingOut>>({
      url: `/marketplace/public/listings/${encodeURIComponent(id)}`,
      method: 'get',
    })

    return unwrap(response.data)
  }
}
