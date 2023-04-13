import { Invoice, type InvoiceProps } from "~/components/rsvp/invoice"

import type { LoaderArgs } from "@remix-run/node"
import { getDetailsRsvpRecord } from "~/services/rsvp/details-record"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader({ params }: LoaderArgs) {
  const { recordId } = params
  console.log({ recordId })

  if (typeof recordId !== "string") throw new Error("Invalid parameter")

  const data = (await getDetailsRsvpRecord(recordId)).record

  const record: InvoiceProps = {
    typeInvoice: "CONFIRMATION",
    name: data.name,
    date: data.date,
    phone: data.customer.phoneNumber!,
    products: data.products.map((x) => {
      return {
        count: x.amount,
        name: x.product.name,
        price: x.product.price.amount,
        total: x.amount * x.product.price.amount,
        desc: x.note,
      }
    }),
    total: data.transaction.amount,
  }

  return json({
    recordId,
    record,
  })
}

export default function () {
  const { record } = useLoaderData<typeof loader>()
  return (
    <div>
      <Invoice data={record} />
    </div>
  )
}
