import { Invoice, type InvoiceProps } from "~/components/rsvp/invoice"
import { UserHeader } from "~/components/ui/header/user-header"

export default function () {
  const mockConfirmation: InvoiceProps = {
    typeInvoice: "INVOICE",
    invoiceNumber: "9999",
    name: "Rei Mock",
    date: new Date().toISOString(),
    phone: "628xxxx",
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
