import { api, getHeaders } from "~/services/core"
import type { RsvpRecordStatus } from "../status-types"

export type UpdateStatusRecord = {
  rsvpId: string
  recordId: string
  status: RsvpRecordStatus
  rejectedReason?: string
}

export async function updateStatusRecord(payload: UpdateStatusRecord, auth: Auth) {
  const { data } = await api.put("/rsvp/management/status", payload, getHeaders(auth))

  console.log({ data })

  return data
}
