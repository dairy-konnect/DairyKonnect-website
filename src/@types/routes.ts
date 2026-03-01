export interface RouteConfig {
  key: string
  path: string
  component: React.ComponentType
  meta?: RouteMeta
}

export interface RouteMeta {
  title?: string
  description?: string
  keywords?: string[]
  layout?: string
  breadcrumb?: BreadcrumbItem[]
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

export type AppRoute = RouteConfig[]