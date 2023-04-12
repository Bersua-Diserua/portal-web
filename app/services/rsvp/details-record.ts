import { z } from "zod"
import { api } from "../core"
import { rsvpRecordStatus } from "./management/details"

const schema = z.object({
  status: rsvpRecordStatus,
  rejectedReason: z.null(),
  customerId: z.string(),
  capacity: z.string(),
  capacityNumber: z.number(),
  date: z.string(),
  email: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  seatIndex: z.number(),
  time: z.string(),
  transaction: z.object({ date: z.string().nullable(), amount: z.number() }),
  id: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      note: z.string(),
      amount: z.number(),
      product: z.object({
        name: z.string(),
        category: z.string(),
        price: z.object({ amount: z.number(), unit: z.string() }),
        id: z.string(),
      }),
    })
  ),
  customer: z.object({
    id: z.string(),
    name: z.string().nullable(),
    phoneNumber: z.string().nullable(),
  }),
})

type Res = TResponse<{
  record: z.infer<typeof schema>
}>

export async function getDetailsRsvpRecord(recordId: string) {
  const { data } = await api.get<Res>(`/rsvp/record/${recordId}/details`)
  const record = schema.parse(data.payload.record)
  return {
    record,
  }
}
