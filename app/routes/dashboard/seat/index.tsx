import { SeatAdmin, SeatContainer } from "~/components/rsvp/seat-container"
import { useCallback, useEffect, useState } from "react"

import { Calendar } from "primereact/calendar"
import type { CalendarChangeEvent } from "primereact/calendar"
import type { Nullable } from "primereact/ts-helpers"
import type { SeatProps } from "~/services/rsvp/seat-management"
import { useFetcher } from "@remix-run/react"

export default function () {
  const fetcherSeat = useFetcher()
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - 30)

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)

  const [date, setDate] = useState<Nullable<string | Date | Date[]>>(new Date())
  const [seats, setSeats] = useState<SeatProps[] | null>(null)

  const doFetchSeat = useCallback((date: string) => {
    fetcherSeat.load(`/rsvp/seat?date=` + date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fetcherSeat.data) {
      setSeats(fetcherSeat.data?.seats)
    }
  }, [fetcherSeat.data])

  useEffect(() => {
    if (!window) return
    doFetchSeat(date?.toString()!)
  }, [doFetchSeat, date])

  const handleClick = (index: number | null) => {
    console.log(index)
  }

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Reservation</h1>
      <div className="flex gap-4 mb-4 flex-col">
        <label htmlFor="calendar">Choose date:</label>
        <Calendar id="calendar" minDate={minDate} maxDate={maxDate} value={date} onChange={(e: CalendarChangeEvent) => setDate(e.value)} />
        <SeatContainer>
          {seats?.map((x) => (
            <SeatAdmin {...x} key={x.index} onClick={handleClick} />
          ))}
        </SeatContainer>
      </div>
    </div>
  )
}
