export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  MARKET: {
    PRICES: `${API_BASE}/market/prices`,
  },
  FEEDS: {
    LIST: `${API_BASE}/feeds`,
  },
  NEWS: {
    LIST: `${API_BASE}/news`,
  },
};

export type ApiEndpointGroup = keyof typeof API_ENDPOINTS;