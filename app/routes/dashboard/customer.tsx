import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { useState } from "react"
import { ClientOnly } from "remix-utils"
import { getListCustomers } from "~/services/customer/management/list"
import { getRequiredAuth } from "~/utils/authorization"

export async function loader({ request }: LoaderArgs) {
  const auth = await getRequiredAuth(request)
  const { customers } = await getListCustomers(auth)
  return json({
    customers,
  })
}
export default function () {
  const { customers } = useLoaderData<typeof loader>()
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("")

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGlobalFilterValue(value)
  }

  const header = () => (
    <span className="p-input-icon-left flex justify-end items-end">
      <i className="pi pi-search" />
      <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
    </span>
  )

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Customers</h1>
      <ClientOnly>
        {() => (
          <DataTable
            value={customers}
            header={header}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            dataKey="id"
            showGridlines
            globalFilterFields={["phoneNumber"]}
            globalFilter={globalFilterValue}
            emptyMessage="No customers found."
          >
            <Column field="name" header="Name" />
            <Column field="phoneNumber" header="Whatsapp Number" filter />
          </DataTable>
        )}
      </ClientOnly>
    </div>
  )
}
