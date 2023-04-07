import type { LoaderArgs } from "@remix-run/node"
import { useMemo, useState } from "react"
import clsxm from "~/utils"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { SeatConfig } from "~/config/rsvp"
import { mock } from "~/config/rsvp"
import { SeatContainer } from "~/components/rsvp/seat-container"

export async function loader({ request }: LoaderArgs) {
  return json<{
    seats: { index: number; status: "EMPTY" | "SUBMISSION" | "APPROVED" }[]
  }>({
    seats: [
      {
        index: 1,
        status: "APPROVED",
      },
      {
        index: 9,
        status: "APPROVED",
      },
    ],
  })
}

export default function () {
  const { seats: seatsBooked } = useLoaderData<typeof loader>()
  const [selected, setSelected] = useState<SeatConfig | null>(null)

  const seats = useMemo(() => {
    const register = (idx: number, className: string): JSX.IntrinsicElements["button"] => {
      const booking = seatsBooked.find((x) => x.index === idx) || {
        index: idx,
        status: "EMPTY",
      }

      const isActive = booking.status === "APPROVED"
      return {
        onClick: () => {
          setSelected((old) => (old?.index == idx ? null : mock.find((x) => x.index == idx)!))
        },
        children: idx,
        className: clsxm(className, "border absolute", [isActive && "bg-red-200", selected?.index === idx && "bg-red-500"]),
      }
    }
    return mock.map((x) => <button key={x.index} {...register(x.index, x.positionCss)} />)
  }, [selected, setSelected, seatsBooked])

  return (
    <>
      <p>Table Management</p>
      <div>
        {/* <div className="border border-red-100 aspect-square relative">
          {seats}
          <div className="border pointer-events-none w-[65%] h-[65%] absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]">
            Joglo
          </div>
          <div className="border w-[30%] h-[10%] absolute bottom-[-2%] right-[50%] translate-x-[50%]" />
          <div className="border pointer-events-none w-[25%] h-[14%] absolute bottom-[20%] right-[50%] translate-x-[50%] text-center">
            Bar
          </div>
        </div> */}
      </div>
      <p>Selected</p>
      {selected && (
        <>
          <p>{selected.index}</p>
          <p>{selected.capacity}</p>
        </>
      )}
    </>
  )
}
