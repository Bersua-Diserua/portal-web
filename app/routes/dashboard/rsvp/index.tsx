import { useCallback, useEffect, useState } from "react"
import { useFetcher } from "@remix-run/react"
import type { CalendarChangeEvent } from "primereact/calendar"
import { Calendar } from "primereact/calendar"
import type { Nullable } from "primereact/ts-helpers"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { ClientOnly } from "remix-utils"
import { useToast } from "~/components/ui/toast"
import type { PreviewLoader } from "./preview"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useFetcherStringify } from "~/utils/use-submit–stringify"

export default function () {
  const fetcher = useFetcher<PreviewLoader>()
  const fetcherApproval = useFetcherStringify()
  const toast = useToast()
  const [dialog, setDialog] = useState<null | string>(null)

  const minDate = new Date()
  minDate.setDate(minDate.getDate() - 30)

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)

  const [date, setDate] = useState<Nullable<string | Date | Date[]>>(new Date())

  useEffect(() => {
    if (!date) return
    fetcher.load("/dashboard/rsvp/preview?date=" + new Date(date.toString()).toISOString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    if (!fetcher.data) return

    toast.current?.show({
      severity: "info",
      detail: "Sukses memperbarui data: " + new Date(date?.toLocaleString()!).toDateString(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, toast])

  const bodyAction = useCallback((data: NonNullable<typeof fetcher["data"]>["records"][number]) => {
    return <Button onClick={() => setDialog("asd ")}>Detail</Button>
  }, [])

  const approveAction = (data: NonNullable<typeof fetcher["data"]>["records"][number]) => {
    return (
      <Button
        onClick={() =>
          fetcherApproval.submit(
            {
              rsvpId: fetcher.data?.rsvp.id,
              status: "RESOLVE",
              recordId: data.recordId,
            },
            {
              action: "/api/rsvp/status",
              method: "post",
            }
          )
        }
      >
        Approve
      </Button>
    )
  }

  return (
    <>
      <p>Table Management</p>
      <Calendar minDate={minDate} maxDate={maxDate} value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} />
      <ClientOnly>
        {() => (
          <DataTable
            value={fetcher.data?.records ?? []}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="seat" sortable header="Seat"></Column>
            <Column field="details.name" sortable header="Name"></Column>
            <Column field="status" sortable header="Status"></Column>
            <Column field="details.capacity" header="Capacity"></Column>
            <Column field="details.phoneNumber" header="Phone Number"></Column>
            {/* <Column header="Action" body={bodyAction}></Column> */}
            <Column header="Approve" body={approveAction}></Column>
          </DataTable>
        )}
      </ClientOnly>
      <Dialog visible={!!dialog} resizable draggable onHide={() => setDialog(null)}>
        {dialog}
      </Dialog>
    </>
  )
}
