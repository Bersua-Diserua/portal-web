import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { groupType, listRecordsByGroup } from "~/services/rsvp/management/list-record-by-group"
import { getRequiredAuth } from "~/utils/authorization"

export async function loader({ request, params }: LoaderArgs) {
  const auth = await getRequiredAuth(request)
  const type = groupType.parse(params.type)
  const a = await listRecordsByGroup(type, auth)
  return json({
    type,
    a,
  })
}

export default function () {
  const { type, a } = useLoaderData<typeof loader>()
  return (
    <div>
      <Link to="/dashboard/rsvp">{"< Back"}</Link>
      <p>{type}</p>
      <pre>{JSON.stringify(a, null, 2)}</pre>
    </div>
  )
}
