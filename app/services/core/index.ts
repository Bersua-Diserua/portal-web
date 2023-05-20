import type { AxiosError, AxiosResponse } from "axios"
import axios from "axios"
import * as Sentry from "@sentry/remix"
import { z } from "zod"

const api = axios.create({
  baseURL: process.env.BACKEND,
  validateStatus: (status) => status < 500,
})

export function resSchema<TSchema extends z.ZodTypeAny>(schema: TSchema) {
  return z.object({
    message: z.string(),
    payload: schema,
  })
}

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
