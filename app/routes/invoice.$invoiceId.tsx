import { Invoice, type InvoiceProps } from "~/components/rsvp/invoice"
import { UserHeader } from "~/components/ui/header/user-header"
import { type LoaderArgs, json, redirect } from "@remix-run/node"
import { getDetailsInvoice } from "~/services/rsvp/invoice-details"
import { useLoaderData } from "@remix-run/react"

export async function loader({ request, params }: LoaderArgs) {
  const { invoiceId } = params

  const invoice = await getDetailsInvoice(String(invoiceId))

  if (invoice.products.length === 0) {
    throw redirect("/invoice/1")
  }

  return json({ invoice })
}

export default function () {
  const { invoice } = useLoaderData<typeof loader>()
  const mockConfirmation: InvoiceProps = {
    typeInvoice: "INVOICE",
    invoiceNumber: "9999",
    name: invoice.customer.name,
    date: invoice.date,
    phone: invoice.customer.phoneNumber,
    products: [
      {
        name: "Mock 1",
        desc: "Desc mock 1",
        count: "2",
        price: "1000",
        total: "2000",
      },
    ],
    total: "3000",
  }
  return (
    <>
      <UserHeader />
      <div className="w-full px-8 mx-auto max-w-8xl">
        <div className="lg:flex">
          <main className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
            <div className="flex w-full">
              <div className="flex-auto min-w-0 pt-6 pb-12">
                <Invoice data={mockConfirmation} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
