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
      ...invoice,
      typeInvoice: "INVOICE",
      invoiceNumber: invoice.id,
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
              <div className="flex flex-col w-full min-w-0 pt-6 pb-12 gap-y-14 items-center">
                <Invoice data={record} />
                <div className="flex flex-col items-center rounded-lg p-8 bg-[#0f172a] w-full md:w-max text-white gap-y-4">
                  <p>Pindai untuk pembayaran</p>
                  <p className="font-semibold text-lg">Sérua Coffe & Creative Space</p>
                  <div className="bg-white p-1 rounded-lg">
                    <img
                      className="h-[350px] w-[350px] object-contain"
                      src="https://ik.imagekit.io/bersuadiserua22/SCAN_QR.png?tr=w-2324,h-2324,fo-custom,cm-extract"
                      alt=""
                    />
                  </div>
                  <p className="font-semibold tracking-wider text-xl">QRIS</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
