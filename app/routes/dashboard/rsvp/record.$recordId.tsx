import { Invoice, type InvoiceProps } from "~/components/rsvp/invoice"
import type { LoaderArgs } from "@remix-run/node"
import { getDetailsRsvpRecord } from "~/services/rsvp/details-record"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Button } from "primereact/button"
import type { ConfirmDialogProps } from "primereact/confirmdialog"
import { ConfirmDialog } from "primereact/confirmdialog"
import { confirmDialog } from "primereact/confirmdialog"
import { useActionChangeStatus } from "~/routes/api/rsvp/status"
import { StatusRsvp } from "~/components/rsvp/status"
import { useCallback, useState, useMemo } from "react"
import type { RsvpRecordStatus } from "~/services/rsvp/status-types"
import { InputText } from "primereact/inputtext"

export async function loader({ params }: LoaderArgs) {
  const { recordId } = params
  if (typeof recordId !== "string") throw new Error("Invalid parameter")

  const { record } = await getDetailsRsvpRecord(recordId)
  return json({
    recordId,
    record,
  })
}

export default function () {
  const { record } = useLoaderData<typeof loader>()
  const [rejectedMsg, setRejectedMsg] = useState<{ msg: string; error: boolean }>({ msg: "", error: false })
  const [, submit] = useActionChangeStatus()

  const generateConfirmDialog = useCallback(
    (status: RsvpRecordStatus) => {
      const template: ConfirmDialogProps = {
        message: "",
        header: "",
        icon: "pi pi-info-circle",
      }

      if (status === "REJECT") {
        template.header = "Tolak pesanan?"
        template.message = (
          <div>
            <p>Alasan :</p>
            <InputText
              placeholder="Alasan ditolak"
              onChange={(e) => {
                setRejectedMsg((x) => {
                  return { ...x, msg: e.target.value }
                })
              }}
            />
          </div>
        )
        template.accept = () => {
          submit({
            recordId: record.id,
            rsvpId: record.rsvpDailyId,
            status,
            rejectedReason: rejectedMsg.msg || "Pesanan ditolak",
          })
        }
      } else if (status === "SUBMISSION.APPROVE") {
        template.header = "Terima pesanan?"
        template.message = "Rservasi yang diterima akan menunggu proses pembayaran"
        template.accept = () => {
          submit({
            recordId: record.id,
            rsvpId: record.rsvpDailyId,
            status,
          })
        }
      } else if (status === "RESOLVE") {
        template.header = "Terima pesanan dan pembayaran?"
        template.message = "Pastikan pembayaran reservasi sudah diterima"
        template.accept = () => {
          submit({
            recordId: record.id,
            rsvpId: record.rsvpDailyId,
            status,
          })
        }
      }

      return () => confirmDialog(template)
    },
    [record.id, record.rsvpDailyId, rejectedMsg, submit]
  )

  const { status } = record

  return (
    <div>
      <div className="flex flex-row justify-around">
        <Button>Approve</Button>
        <Button severity="success">Verify Paid</Button>
        <Button severity="danger">Reject</Button>
      </div>
      <div className="flex">
        <p>Status :&nbsp;</p>
        <StatusRsvp status={record.status} />
      </div>
      <div>
        <ConfirmDialog />
        <div className="flex gap-5">
          {status === "SUBMISSION.APPROVE" && <Button onClick={generateConfirmDialog("RESOLVE")}>Terima Pembayaran</Button>}
          {status === "SUBMISSION" && <Button onClick={generateConfirmDialog("SUBMISSION.APPROVE")}>Terima Pesanan</Button>}
          {(status === "SUBMISSION" || status === "SUBMISSION.APPROVE") && (
            <Button onClick={generateConfirmDialog("REJECT")}>Tolak Pesanan</Button>
          )}
          {status === "REJECT" && <p>{record.rejectedReason}</p>}
        </div>
      </div>
      <InvoiceDashboard />
    </div>
  )
}

function InvoiceDashboard() {
  const { record: invoice } = useLoaderData<typeof loader>()

  const record = useMemo((): InvoiceProps => {
    return {
      typeInvoice: "INVOICE",
      invoiceNumber: invoice.id,
      name: invoice.name,
      seatIndex: invoice.seatIndex,
      date: invoice.date,
      phone: invoice.customer.phoneNumber!,
      time: "",
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
  }, [invoice])

  return <Invoice data={record} />
}
