import { lazy } from 'react';
import type { ReactElement } from 'react';

// Lazy loaded views
const Home = lazy(() => import('../views/home/Home'));
const About = lazy(() => import('../views/about/About'));
const MarketPrice = lazy(() => import('../views/market/MarketPrice'));
const MilkPrices = lazy(() => import('../views/prices/MilkPrices'));
const Feeds = lazy(() => import('../views/feeds/Feeds'));
const News = lazy(() => import('../views/news/News'));
const Vet = lazy(() => import('../views/vet/Vet'));
const Farmer = lazy(() => import('../views/farmer/Farmer'));
const Vendor = lazy(() => import('../views/vendor/Vendor'));
const Dairy = lazy(() => import('../views/dairy/Dairy'));
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const Reports = lazy(() => import('../views/reports/Reports'));
const TransactionEntry = lazy(() => import('../views/transactions/TransactionEntry'));
const TransactionHistory = lazy(() => import('../views/transactions/TransactionHistory'));

// Legacy components (to be refactored)
const Landing = lazy(() => import('../views/legacy/Landing'));
const BillGeneration = lazy(() => import('../views/legacy/BillGeneration'));

export interface AppRoute {
  path: string;
  element: ReactElement;
  name?: string;
  nav?: boolean; // show in navigation
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About />, nav: true, name: 'About' },
  // Market and Milk Prices – hidden from nav for now (routes still work)
  { path: '/market', element: <MarketPrice />, nav: false, name: 'Market' },
  { path: '/milk-prices', element: <MilkPrices />, nav: false, name: 'Milk Prices' },
  { path: '/feeds', element: <Feeds />, nav: true, name: 'Feeds' },
  { path: '/news', element: <News />, nav: true, name: 'News' },
  { path: '/vet', element: <Vet /> },
  { path: '/farmer', element: <Farmer /> },
  { path: '/vendor', element: <Vendor /> },
  { path: '/dairy', element: <Dairy /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/reports', element: <Reports /> },
  { path: '/transactions/entry', element: <TransactionEntry /> },
  { path: '/transactions/history', element: <TransactionHistory /> },
  // Legacy routes - to be refactored
  { path: '/ownerlanding', element: <Landing /> },
  { path: '/bill', element: <BillGeneration /> },
  { path: '/entry', element: <TransactionEntry /> }, // Legacy route
  { path: '/history', element: <TransactionHistory /> }, // Legacy route
];

export const NAVIGATION_ROUTES = APP_ROUTES.filter(r => r.nav);
