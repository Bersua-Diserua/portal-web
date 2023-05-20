import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { RsvpStat } from "~/components/ui/stats"
import { getOverview } from "~/services/rsvp/management/overview"
import { getRequiredAuth } from "~/utils/authorization"

export async function loader({ request }: LoaderArgs) {
  const auth = await getRequiredAuth(request)
  return json({
    overview: await getOverview(auth),
  })
}

export default function () {
  const { overview } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold">Reservasi</h1>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-4">
        <Link to="/dashboard/rsvp/record/type/today">
          <RsvpStat title="Hari ini" overview={overview.today} />
        </Link>
        <Link to="/dashboard/rsvp/record/type/month">
          <RsvpStat title="30 hari" overview={overview.month} />
        </Link>
        <Link to="/dashboard/rsvp/record/type/ago">
          <RsvpStat title="Riwayat" overview={overview.ago} />
        </Link>
      </div>
    </div>
  )
}
