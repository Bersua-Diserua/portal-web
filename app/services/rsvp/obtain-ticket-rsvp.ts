import { api } from "../core"

type RsvpTicket = {
  id: string
  status: "TICKET"
  phoneNumber: string
}

export async function getObtainRsvpTicket(ticketId: string) {
  const { data } = await api.get<TResponse<{ rsvp: RsvpTicket }>>("/rsvp/details/" + ticketId)

  return data.payload
}
