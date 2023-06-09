import { Link, useFetcher, useLoaderData } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"

import { Calendar } from "primereact/calendar"
import type { CalendarChangeEvent } from "primereact/calendar"
import { ClientOnly } from "remix-utils"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import type { LoaderArgs } from "@remix-run/node"
import type { Nullable } from "primereact/ts-helpers"
import type { PreviewLoader } from "./preview"
import { RsvpStat } from "~/components/ui/stats"
import { StatusRsvp } from "~/components/rsvp/status"
import { getOverview } from "~/services/rsvp/management/overview"
import { getRequiredAuth } from "~/utils/authorization"
import { json } from "@remix-run/node"
import { useToast } from "~/components/ui/toast"

export async function loader({ request }: LoaderArgs) {
  const auth = await getRequiredAuth(request)
  return json({
    overview: await getOverview(auth),
  })
}

export default function () {
  const { overview } = useLoaderData<typeof loader>()
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

  const bodyAction = useCallback((data: NonNullable<(typeof fetcher)["data"]>["records"][number]) => {
    return <Link to={`/dashboard/rsvp/record/${data.recordId}`}>Details</Link>
  }, [])

  const statusColumn = useCallback((data: NonNullable<(typeof fetcher)["data"]>["records"][number]) => {
    return <StatusRsvp status={data.status} />
  }, [])

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Reservation</h1>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-4">
        <Link to="/dashboard/rsvp/record/type/today">
          <RsvpStat title="Hari ini" overview={overview.today} />
        </Link>
        <Link to="/dashboard/rsvp/record/type/month">
          <RsvpStat title="30 hari" overview={overview.month} />
        </Link>
        <Link to="/dashboard/rsvp/record/type/ago">
          <RsvpStat title="Riwayat" overview={overview.ago} />
        </Link>
      </div>
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
            <Column field="seat" sortable header="Seat" />
            <Column field="details.name" sortable header="Name" />
            <Column field="status" sortable header="Status" body={statusColumn} />
            <Column field="details.capacity" header="Capacity" />
            <Column field="details.phoneNumber" header="Phone Number" />
            <Column header="Action" body={bodyAction} />
          </DataTable>
        )}
      </ClientOnly>
      <Dialog visible={!!dialog} resizable draggable onHide={() => setDialog(null)}>
        {dialog}
      </Dialog>
    </div>
  )
}
