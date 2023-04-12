import { Invoice, type InvoiceProps } from "~/components/rsvp/invoice"
import { UserHeader } from "~/components/ui/header/user-header"
import { type LoaderArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getDetailsRsvpRecord } from "~/services/rsvp/details-record"
import { useMemo } from "react"

export async function loader({ params }: LoaderArgs) {
  try {
    const { invoiceId } = params

    if (typeof invoiceId !== "string") throw new Error("Invalid parameter")

    const invoice = await getDetailsRsvpRecord(invoiceId)

    return json({ invoice: invoice.record })
  } catch (error) {
    console.log("Error")
    throw redirect("/rsvp")
  }
}

export default function () {
  const { invoice } = useLoaderData<typeof loader>()
  const record = useMemo(() => {
    const data: InvoiceProps = {
      typeInvoice: "INVOICE",
      invoiceNumber: invoice.id,
      name: invoice.name,
      date: invoice.date,
      phone: invoice.customer.phoneNumber!,
      products: invoice.products.map((x) => {
        return {
          count: x.amount,
          name: x.product.name,
          price: x.product.price.amount,
          total: x.amount * x.product.price.amount,
          desc: x.note,
        }
      }),
      total: invoice.transaction.amount,
    }
    return data
  }, [invoice])

  return (
    <>
      <UserHeader />
      <div className="w-full px-8 mx-auto max-w-8xl">
        <div className="lg:flex">
          <main className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
            <div className="flex w-full">
              <div className="flex-auto min-w-0 pt-6 pb-12">
                <Invoice data={record} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
