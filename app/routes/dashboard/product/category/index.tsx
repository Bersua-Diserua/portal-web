import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { Form, useFetcher, useLoaderData } from "@remix-run/react"
import { listCategories, recordCategory, removeCategory, updateCategory } from "~/services/product/category"

import { Button } from "primereact/button"
import { Column } from "primereact/column"
import type { ColumnEditorOptions } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { getRequiredAuth } from "~/utils/authorization"
import { json } from "@remix-run/node"

export async function loader({ request }: LoaderArgs) {
  const { categories } = await listCategories()
  return json({
    categories,
  })
}

export async function action({ request }: ActionArgs) {
  const auth = await getRequiredAuth(request)
  const formData = await request.formData()

  const { method } = request
  if (method === "PUT") {
    return updateCategory(auth, formData.get("id") as string, formData.get("name") as string).then(() => json(null))
  } else if (method === "POST") {
    return recordCategory(auth, formData.get("name") as string).then(() => json(null))
  } else if (method === "DELETE") {
    return removeCategory(auth, formData.get("id") as string)
  }

  return null
}

export default function () {
  const { categories } = useLoaderData<typeof loader>()
  const updateFetcher = useFetcher()
  const removeFetcher = useFetcher()

  const textEditor = (options: ColumnEditorOptions) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback?.(e.target.value)} />
  }

  return (
    <div>
      <div>
        <h1>New category</h1>
        <Form method="post" reloadDocument>
          <InputText name="name" />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
      <DataTable
        value={categories}
        editMode="row"
        dataKey="id"
        onRowEditComplete={(args) => {
          updateFetcher.submit(
            {
              id: args.data.id,
              name: args.newData.name,
            },
            { method: "put" }
          )
        }}
      >
        <Column field="id" header="ID" />
        <Column sortable field="name" header="Name" editor={textEditor} />
        <Column header="Action" />
        <Column rowEditor header="Action" headerStyle={{ width: "10%", minWidth: "8rem" }} bodyStyle={{ textAlign: "center" }} />
        <Column
          header="Delete"
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          body={(data) => (
            <Button
              onClick={() => {
                removeFetcher.submit({ id: data.id }, { method: "delete" })
              }}
              severity="danger"
            >
              Delete
            </Button>
          )}
        />
      </DataTable>
    </div>
  )
}
