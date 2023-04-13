import { Link, useFetcher } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"

import { Calendar } from "primereact/calendar"
import type { CalendarChangeEvent } from "primereact/calendar"
import { ClientOnly } from "remix-utils"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import type { Nullable } from "primereact/ts-helpers"
import type { PreviewLoader } from "./preview"
import { useToast } from "~/components/ui/toast"
import { StatusRsvp } from "~/components/rsvp/status"

export default function () {
  const fetcher = useFetcher<PreviewLoader>()
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
    return <Link to={`/dashboard/rsvp/record/${data.recordId}`}>Details</Link>
  }, [])

  const statusColumn = useCallback((data: NonNullable<typeof fetcher["data"]>["records"][number]) => {
    return <StatusRsvp status={data.status} />
  }, [])

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Reservation</h1>
      <div className="flex gap-4 mb-4 flex-col">
        <label htmlFor="calendar">Choose date:</label>
        <Calendar id="calendar" minDate={minDate} maxDate={maxDate} value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} />
      </div>
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
            <Column field="status" sortable header="Status" body={statusColumn}></Column>
            <Column field="details.capacity" header="Capacity"></Column>
            <Column field="details.phoneNumber" header="Phone Number"></Column>
            <Column header="Action" body={bodyAction}></Column>
          </DataTable>
        )}
      </ClientOnly>
      <Dialog visible={!!dialog} resizable draggable onHide={() => setDialog(null)}>
        {dialog}
      </Dialog>
    </div>
  )
}
