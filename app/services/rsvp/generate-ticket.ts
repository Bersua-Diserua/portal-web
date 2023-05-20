import { z } from "zod"
import { api, resSchema } from "../core"

export async function generateTicket(phoneNumber?: string) {
  const { data } = await api.get("/rsvp/ticket", {
    params: { phoneNumber },
  })

  return resSchema(
    z.object({
      redirectTo: z.string(),
      id: z.string(),
    })
  ).parse(data).payload
}
