import type { AxiosError, AxiosResponse } from "axios"
import axios from "axios"
import * as Sentry from "@sentry/remix"

const api = axios.create({
  baseURL: process.env.BACKEND,
  validateStatus: (status) => status < 500,
})

export function getHeaders(auth: Auth) {
  return {
    headers: {
      Authorization: auth.accessToken,
    },
  }
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    Sentry.captureException(error)
    return Promise.reject(error)
  }
)

export { api }
