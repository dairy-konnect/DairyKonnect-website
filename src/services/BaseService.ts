import axios from 'axios'
import appConfig from '@configs/app.config'

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
  headers: {
    'Content-Type': 'application/json',
  },
})

BaseService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default BaseService
