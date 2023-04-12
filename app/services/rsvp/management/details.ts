import { api, getHeaders } from "~/services/core"

import qs from "querystring"
import { z } from "zod"

export const rsvpRecordStatus = z.enum(["TICKET", "SUBMISSION", "SUBMISSION.APPROVE", "ON_HOLD", "PAYMENT", "RESOLVE", "REJECT"])

const schema = z.array(
  z.object({
    recordId: z.string(),
    seat: z.number(),
    status: rsvpRecordStatus,
    details: z.object({
      status: rsvpRecordStatus,
      rejectedReason: z.null(),
      capacity: z.string(),
      capacityNumber: z.number(),
      date: z.string(),
      email: z.string(),
      name: z.string(),
      phoneNumber: z.string(),
      seatIndex: z.number(),
      time: z.string(),
      transaction: z.object({
        date: z.string().nullable(),
        amount: z.number(),
      }),
      customer: z.object({
        name: z.null(),
        phoneNumber: z.string(),
        id: z.string(),
      }),
    }),
  })
)

type ResRsvpRecordsByDate = TResponse<{
  records: z.infer<typeof schema>
  rsvp: {
    id: string
  }
}>

export async function getRsvpRecordsByDate(date: string, auth: Auth) {
  const query = qs.stringify({ date })
  const { data } = await api.get<ResRsvpRecordsByDate>("/rsvp/management?" + query, getHeaders(auth))
  schema.parse(data.payload.records)
  return data.payload
}
