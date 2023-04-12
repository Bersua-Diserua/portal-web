import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getDetailsRsvpRecord } from "~/services/rsvp/details-record"

export async function loader({ params }: LoaderArgs) {
  const { recordId } = params
  console.log({ recordId })

  if (typeof recordId !== "string") throw new Error("Invalid parameter")

  const data = await getDetailsRsvpRecord(recordId)
  return json({
    recordId,
    record: data.record,
  })
}

export default function () {
  const { record } = useLoaderData<typeof loader>()
  return (
    <div>
      {/* Data */}
      <div className="flex">
        <p>Name</p>
        <p>{record.name}</p>
      </div>
    </div>
  )
}
