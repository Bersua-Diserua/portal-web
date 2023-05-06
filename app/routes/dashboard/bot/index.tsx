import { ClientOnly } from "remix-utils"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import type { LoaderArgs } from "@remix-run/node"
import { getResponseList } from "~/services/bot/list"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader({ request }: LoaderArgs) {
  const { list } = await getResponseList()
  return json({
    list,
  })
}

export default function () {
  const { list } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Bot Message</h1>
      <ClientOnly>
        {() => (
          <DataTable
            value={list}
            paginator
            rows={100}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            dataKey="id"
            showGridlines
            globalFilterFields={["commandCode"]}
            emptyMessage="No response found."
            sortField="commandCode"
            sortOrder={1}
          >
            <Column field="commandCode" header="Code" />
            <Column field="message" header="Response" filter />
            <Column field="type" header="Type" filter />
          </DataTable>
        )}
      </ClientOnly>
    </div>
  )
}
