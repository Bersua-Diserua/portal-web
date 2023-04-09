import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { getRsvpRecordsByDate } from "~/services/rsvp/management/details"
import { getRequiredAuth } from "~/utils/authorization"

export async function loader({ request }: LoaderArgs) {
  const auth = await getRequiredAuth(request)
  const url = new URL(request.url)
  const date = url.searchParams.get("date")

  if (typeof date !== "string") throw new Error()
  const { records, rsvp } = await getRsvpRecordsByDate(date, auth)

  return json({
    records,
    rsvp,
  })
}

export type PreviewLoader = typeof loader

export default function () {
  return null
}
