// Simple mock service layer for fetching milk market prices.
// In production, replace with real API calls or a server proxy.

export interface MarketPriceRecord {
  id: string;
  region: string;
  milkType: 'Cow' | 'Buffalo';
  fat: number; // percentage
  snf: number; // solids-not-fat percentage
  pricePerLitre: number; // in local currency
  updatedAt: string; // ISO date
}

const mockData: MarketPriceRecord[] = [
  { id: 'mp1', region: 'Telangana', milkType: 'Cow', fat: 3.8, snf: 8.5, pricePerLitre: 38, updatedAt: new Date().toISOString() },
  { id: 'mp2', region: 'Telangana', milkType: 'Buffalo', fat: 6.5, snf: 9.2, pricePerLitre: 52, updatedAt: new Date().toISOString() },
  { id: 'mp3', region: 'Andhra Pradesh', milkType: 'Cow', fat: 4.0, snf: 8.6, pricePerLitre: 39, updatedAt: new Date().toISOString() },
  { id: 'mp4', region: 'Andhra Pradesh', milkType: 'Buffalo', fat: 6.2, snf: 9.0, pricePerLitre: 51, updatedAt: new Date().toISOString() },
  { id: 'mp5', region: 'Karnataka', milkType: 'Cow', fat: 3.9, snf: 8.7, pricePerLitre: 40, updatedAt: new Date().toISOString() },
  { id: 'mp6', region: 'Karnataka', milkType: 'Buffalo', fat: 6.4, snf: 9.1, pricePerLitre: 53, updatedAt: new Date().toISOString() },
];

export interface FetchParams { region?: string; milkType?: 'Cow' | 'Buffalo' | 'All'; }

export async function fetchMarketPrices(params: FetchParams = {}): Promise<MarketPriceRecord[]> {
  await new Promise(r => setTimeout(r, 250));
  const { region, milkType } = params;
  return mockData.filter(r => (
    (!region || r.region === region) &&
    (!milkType || milkType === 'All' || r.milkType === milkType)
  ));
}

export function convertLitreToGallon(litres: number): number { return +(litres * 0.264172).toFixed(3); }
