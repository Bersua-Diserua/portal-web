/* eslint-disable react/jsx-key */
import type { LoaderArgs } from "@remix-run/node"
import { Link, useFetcher, useLoaderData } from "@remix-run/react"
import { json, redirect } from "@remix-run/node"

import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { InputSwitch } from "primereact/inputswitch"
import { api } from "~/services/core"
import { getRequiredAuth } from "~/utils/authorization"
import { listProducts } from "~/services/product/management"
import { useCallback } from "react"

export async function loader({ request }: LoaderArgs) {
  const auth = await getRequiredAuth(request)

  const products = (await listProducts(auth))?.products
  return json({
    products,
  })
}

export async function action({ request }: LoaderArgs) {
  const data = await request.formData()
  await api.put("/product/management/" + data.get("id") + "/status", {
    status: data.get("status"),
  })

  return redirect("/dashboard/product")
}

export default function () {
  const fetcher = useFetcher()
  const { products } = useLoaderData<typeof loader>()

  const bodyAction = useCallback((data: (typeof products)[number]) => {
    return (
      <Link to={"/dashboard/product/edit/" + data.id}>
        <Button>Edit</Button>
      </Link>
    )
  }, [])

  const bodyPreview = useCallback((data: (typeof products)[number]) => {
    const src = data.images[0]?.url
    // eslint-disable-next-line jsx-a11y/alt-text
    return src ? <img className="w-[5rem] aspect-square" src={src} /> : null
  }, [])

  const onChangeStatus = (id: string, status: string) => {
    fetcher.submit({ id, status }, { method: "put" })
  }

  return (
    <div>
      <h1 className="text-lg font-bold">Products</h1>
      <div className="flex w-full items-end gap-5 justify-end mb-4">
        <Link to="/dashboard/product/add">
          <Button>Add product</Button>
        </Link>
        <Link to="/dashboard/product/category">
          <Button>Categories</Button>
        </Link>
      </div>
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}>
        <Column field="name" sortable header="Name"></Column>
        <Column field="desc" header="Description"></Column>
        <Column field="category.name" sortable header="Category"></Column>
        <Column
          header="Status"
          body={(val) => <InputSwitch checked={val.status === "A"} onChange={(e) => onChangeStatus(val.id, String(e.value))} />}
        ></Column>
        <Column header="Action" body={bodyAction}></Column>
        <Column header="Preview" body={bodyPreview}></Column>
      </DataTable>
    </div>
  )
}
