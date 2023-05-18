import { redirect } from "@remix-run/node"
import { generateTicket } from "~/services/rsvp/generate-ticket"

export async function loader() {
  const { id } = await generateTicket()
  return redirect(`/rsvp/${id}`)
}
