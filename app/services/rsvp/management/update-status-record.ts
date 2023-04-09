import { api, getHeaders } from "~/services/core"

export type UpdateStatusRecord = {
  rsvpId: string
  recordId: string
  status: string
}

export async function updateStatusRecord(payload: UpdateStatusRecord, auth: Auth) {
  const { data } = await api.put("/rsvp/management/status", payload, getHeaders(auth))

  return data
}
