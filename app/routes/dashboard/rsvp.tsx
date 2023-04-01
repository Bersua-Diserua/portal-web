import type { LoaderArgs } from "@remix-run/node"
import { useMemo, useState } from "react"
import clsxm from "~/utils"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

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

type SeatConfig = {
  index: number
  capacity: number
  positionCss: string
}

const SQUARE = "w-[12%] h-[12%]"
const RECTANGLE = "w-[12%] h-[17%]"

const mock: SeatConfig[] = [
  {
    index: 1,
    positionCss: clsxm("left-[3%] top-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 2,
    positionCss: clsxm("left-[18%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 3,
    positionCss: clsxm("left-[33%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 4,
    positionCss: clsxm("right-[33%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 5,
    positionCss: clsxm("right-[18%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 6,
    positionCss: clsxm("right-[3%] top-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 7,
    positionCss: clsxm("right-[3%] top-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 7,
    positionCss: clsxm("right-[3%] bottom-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 8,
    positionCss: clsxm("right-[3%] bottom-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 9,
    positionCss: clsxm("left-[3%] bottom-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 9,
    positionCss: clsxm("left-[3%] bottom-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 10,
    positionCss: clsxm("left-[3%] top-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 11,
    positionCss: "w-[24%] h-[14%] left-[22%] top-[28%]",
    capacity: 1,
  },
  {
    index: 12,
    positionCss: "w-[24%] h-[14%] right-[22%] top-[28%]",
    capacity: 1,
  },
  {
    index: 13,
    positionCss: "w-[25%] h-[5%] left-[22%] bottom-[-1%]",
    capacity: 1,
  },
  {
    index: 14,
    positionCss: "w-[25%] h-[5%] right-[22%] bottom-[-1%]",
    capacity: 1,
  },
  {
    index: 15,
    positionCss: clsxm("right-[21%] bottom-[20%]", SQUARE),
    capacity: 1,
  },
  {
    index: 16,
    positionCss: clsxm("left-[21%] bottom-[20%]", SQUARE),
    capacity: 1,
  },
]

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
        <div className="border border-red-100 aspect-square relative">
          {seats}
          <div className="border pointer-events-none w-[65%] h-[65%] absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]">
            Joglo
          </div>
          {/* <div className="border w-[30%] h-[10%] absolute bottom-[-2%] right-[50%] translate-x-[50%]" /> */}
          <div className="border pointer-events-none w-[25%] h-[14%] absolute bottom-[20%] right-[50%] translate-x-[50%] text-center">
            Bar
          </div>
        </div>
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
