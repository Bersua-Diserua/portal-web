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
  const [state, setState] = useState<"FORM" | "ORDER">("ORDER")

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

  return (
    <div className="pb-8">
      <h1>{rsvpId}</h1>
      <SeatContainer>
        {seats.map((x) => (
          <Seat {...x} key={x.index} onClick={() => handleSeatOnClick(x)} status={selectedSeat === x.index ? "SELECTED" : x.status} />
        ))}
      </SeatContainer>
      <div className="mt-8">
        <div className="p-2 flex flex-row gap-5">
          <button onClick={() => handleNavOnClick("FORM")}>Data diri</button>
          <button onClick={() => handleNavOnClick("ORDER")}>Pesanan</button>
        </div>
        {state === "FORM" ? <RsvpForm /> : <OrderContent products={products} />}
      </div>
    </div>
  )
}
