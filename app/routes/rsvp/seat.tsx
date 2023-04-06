import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { getSeatByDate } from "~/services/rsvp/seat-management"

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const date = url.searchParams.get("date")

  if (typeof date !== "string") throw new Error()

  const { seats } = await getSeatByDate(date)

  return json({
    seats,
    date,
  })
}

export default function () {
  return null
}
