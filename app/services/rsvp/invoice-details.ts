import { api } from "../core"

type Invoice = {
  status: string
  capacity: string
  date: string
  seatIndex: number
  time: string
  products: Object[]
  customer: {
    name: string
    phoneNumber: string
  }
  id: string
}

export async function getDetailsInvoice(ticketId: string) {
  const { data } = await api.get<TResponse<{ invoice: Invoice }>>("/rsvp/invoice/" + ticketId)

  return data.payload.invoice
}
