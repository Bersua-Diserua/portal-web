import { json, type LoaderArgs } from "@remix-run/node"
import { RsvpForm } from "~/components/rsvp/form"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"
import { Seat, SeatContainer } from "~/components/rsvp/seat-container"
import { type SeatProps } from "~/services/rsvp/seat-management"
import { useRsvp } from "~/store/use-rsvp"
import { OrderContent } from "~/components/order-content"
import { listProducts } from "~/services/product/list"

export async function loader({ request, params }: LoaderArgs) {
  const { rsvpId } = params
  // const { seats } = await getSeatManagement()
  const products = await listProducts()
  return json({ products, rsvpId: String(rsvpId) })
}

export default function () {
  const { products, rsvpId } = useLoaderData<typeof loader>()
  const [seats, setSeats] = useState<SeatProps[] | null>(null)
  const { selectedSeat, setSelectedSeat } = useRsvp()
  const [state, setState] = useState<"FORM" | "ORDER" | "CONFIRMATION">("ORDER")
  const fetcherSeat = useFetcher()

  const doFetchSeat = useCallback((date: string) => {
    fetcherSeat.load(`/rsvp/seat?date=` + date)
  }, [])

  useEffect(() => {
    if (!window) return
    doFetchSeat(new Date().toISOString())
  }, [doFetchSeat])

  useEffect(() => {
    if (fetcherSeat.data) {
      console.log(fetcherSeat.data)
      setSeats(fetcherSeat.data?.seats)
    }
  }, [fetcherSeat.data])

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
    <div className="flex flex-col gap-y-5 pb-8">
      <p className="text-xl">Serua Reservasi</p>
      <ol className="flex justify-around items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
        <li className={`flex items-center cursor-pointer ${state === "FORM" && "text-serua"}`} onClick={() => handleNavOnClick("FORM")}>
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              state === "FORM" ? "border-serua" : "border-gray-500"
            }`}
          >
            1
          </span>
          Data Diri
        </li>
        <li className={`flex items-center cursor-pointer ${state === "ORDER" && "text-serua"}`} onClick={() => handleNavOnClick("ORDER")}>
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              state === "ORDER" ? "border-serua" : "border-gray-500"
            }`}
          >
            2
          </span>
          Pesanan
        </li>
        <li
          className={`flex items-center cursor-pointer ${state === "CONFIRMATION" && "text-serua"}`}
          onClick={() => handleNavOnClick("CONFIRMATION")}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              state === "CONFIRMATION" ? "border-serua" : "border-gray-500"
            }`}
          >
            3
          </span>
          Confirmation
        </li>
      </ol>

      {state === "FORM" ? (
        <>
          <div className="flex flex-col gap-y-5">
            <SeatContainer>
              {seats?.map((x) => (
                <Seat {...x} key={x.index} onClick={() => handleSeatOnClick(x)} status={selectedSeat === x.index ? "SELECTED" : x.status} />
              ))}
            </SeatContainer>
            <RsvpForm onChangeDate={(date) => doFetchSeat(date)} />
          </div>
        </>
      ) : (
        <OrderContent products={products} />
      )}
      <div className="flex flex-row items-center bottom-0 sticky gap-x-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="bg-serua px-5 py-2 shadow-sm tracking-wider text-white rounded-full mb-8 w-max">
            FAB
          </div>
        ))}
      </div>
    </div>
  )
}
