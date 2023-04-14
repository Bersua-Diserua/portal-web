import { api } from "../core"

export async function postSubmitRsvp(rsvpId: string, payload: TObjUnknown) {
  const { data } = await api.post("/rsvp/submit/" + rsvpId, payload)

  console.log({ data, payload })
}
