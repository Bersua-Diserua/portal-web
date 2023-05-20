import { Link, useLoaderData } from "@remix-run/react"
import { groupType, listRecordsByGroup } from "~/services/rsvp/management/list-record-by-group"

import { ClientOnly } from "remix-utils"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { date as DateFormat } from "~/utils/date-formatter"
import type { LoaderArgs } from "@remix-run/node"
import { StatusRsvp } from "~/components/rsvp/status"
import { getRequiredAuth } from "~/utils/authorization"
import { json } from "@remix-run/node"
import { useCallback } from "react"

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

  const statusColumn = useCallback((data: NonNullable<(typeof a)["data"]>["records"][number]) => {
    return <StatusRsvp status={data.status} />
  }, [])

  const bodyAction = useCallback((data: NonNullable<(typeof a)["data"]>["records"][number]) => {
    return <Link to={`/dashboard/rsvp/record/${data.id}`}>Details</Link>
  }, [])

  return (
    <div>
      <Link to="/dashboard/rsvp">{"< Back"}</Link>
      <h1 className="text-lg font-bold mb-4 capitalize my-4">{type}</h1>
      <ClientOnly>
        {() => (
          <DataTable
            value={a.payload.records ?? []}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="seat" sortable header="Seat" />
            <Column field="name" sortable header="Name" />
            <Column field="status" sortable header="Status" body={statusColumn} />
            <Column field="capacity" header="Capacity" />
            <Column header="Date" body={(val) => <p>{DateFormat.format(new Date(val.rsvpDaily.date))}</p>} />
            <Column header="Action" body={bodyAction} />
          </DataTable>
        )}
      </ClientOnly>
    </div>
  )
}
