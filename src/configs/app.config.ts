export type AppConfig = {
  /** Same as Vitals7: relative prefix; dev requests go through Vite `server.proxy`. */
  apiPrefix: string
}

const appConfig: AppConfig = {
  apiPrefix: '/api/v1',
}

export default appConfig
