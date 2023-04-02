import { Link, useLoaderData } from "@remix-run/react"

import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
/* eslint-disable react/jsx-key */
import type { LoaderArgs } from "@remix-run/node"
import { getRequiredAuth } from "~/utils/authorization"
import { json } from "@remix-run/node"
import { listProducts } from "~/services/product/management"
import { useCallback } from "react"

export async function loader({ request }: LoaderArgs) {
  const auth = await getRequiredAuth(request)

  const products = (await listProducts(auth))?.products
  return json({
    products,
  })
}

export default function () {
  const { products } = useLoaderData<typeof loader>()

  const bodyAction = useCallback((data: typeof products[number]) => {
    return (
      <Link to={"/dashboard/product/edit/" + data.id}>
        <Button>Edit</Button>
      </Link>
    )
  }, [])

  const bodyPreview = useCallback((data: typeof products[number]) => {
    const src = data.images[0]?.url
    // eslint-disable-next-line jsx-a11y/alt-text
    return src ? <img className="w-[5rem] aspect-square" src={src} /> : null
  }, [])

  return (
    <div>
      <div>
        <Link to="/dashboard/product/add">
          <Button>Add product</Button>
        </Link>
        <Link to="/dashboard/product/category">
          <Button>Categories</Button>
        </Link>
      </div>
      <h1>Products</h1>
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
        <Column field="name" sortable header="Name"></Column>
        <Column field="desc" header="Description"></Column>
        <Column field="category.name" sortable header="Category"></Column>
        <Column header="Action" body={bodyAction}></Column>
        <Column header="Preview" body={bodyPreview}></Column>
      </DataTable>
    </div>
  )
}
