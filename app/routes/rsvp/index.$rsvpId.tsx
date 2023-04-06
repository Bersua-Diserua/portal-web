import { json, type LoaderArgs } from "@remix-run/node"
import { RsvpForm } from "~/components/rsvp/form"
import { useLoaderData } from "@remix-run/react"
import { useCallback, useState } from "react"
import { Seat, SeatContainer } from "~/components/rsvp/seat-container"
import { getSeatManagement, type SeatProps } from "~/services/rsvp/seat-management"
import { useRsvp } from "~/store/use-rsvp"
import { OrderContent } from "~/components/order-content"
import { listProducts } from "~/services/product/list"

export async function loader({ request, params }: LoaderArgs) {
  const { rsvpId } = params
  const { seats } = await getSeatManagement()
  const { products } = await listProducts()
  return json({ seats, products, rsvpId: String(rsvpId) })
}

export default function () {
  const { seats, products, rsvpId } = useLoaderData<typeof loader>()
  const { selectedSeat, setSelectedSeat } = useRsvp()
  const [state, setState] = useState<"FORM" | "ORDER" | "CONFIRMATION">("FORM")

  const handleSeatOnClick = useCallback(
    (config: SeatProps) => {
      // const capacityRequest = watch("capacity")

      // if (capacityRequest > config.capacity.max) {
      //   alert("No more capacity")
      //   return
      // }

      if (config.status === "RESERVED") {
        return alert(`Already reserved`)
      }

      if (selectedSeat === config.index) {
        setSelectedSeat(null)
        return
      }

      setSelectedSeat(config.index)
    },
    [selectedSeat, setSelectedSeat]
  )

  const handleNavOnClick = useCallback(
    (select: typeof state) => {
      if (state == select) return
      setState(select)
    },
    [state, setState]
  )

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="pb-8">
      <SeatContainer>
        {seats.map((x) => (
          <Seat {...x} key={x.index} onClick={() => handleSeatOnClick(x)} status={selectedSeat === x.index ? "SELECTED" : x.status} />
        ))}
      </SeatContainer>
      <div className="mt-16">
        <ol className="flex justify-around items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 mb-6">
          <li
            className={`flex items-center cursor-pointer ${state === "FORM" && "text-blue-600 dark:text-blue-500"}`}
            onClick={() => handleNavOnClick("FORM")}
          >
            <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              1
            </span>
            Data Diri
          </li>
          <li
            className={`flex items-center cursor-pointer ${state === "ORDER" && "text-blue-600 dark:text-blue-500"}`}
            onClick={() => handleNavOnClick("ORDER")}
          >
            <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              2
            </span>
            Pesanan
          </li>
          <li
            className={`flex items-center cursor-pointer ${state === "CONFIRMATION" && "text-blue-600 dark:text-blue-500"}`}
            onClick={() => handleNavOnClick("FORM")}
          >
            <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
            </span>
            Confirmation
          </li>
        </ol>

        {/* <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} /> */}
        {state === "FORM" ? <RsvpForm /> : <OrderContent products={products} />}
      </div>
    </div>
  )
}
