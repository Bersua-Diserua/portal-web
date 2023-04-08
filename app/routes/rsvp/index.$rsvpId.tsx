import type { ActionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json, type LoaderArgs } from "@remix-run/node"
import { RsvpForm } from "~/components/rsvp/form"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"
import { Seat, SeatContainer } from "~/components/rsvp/seat-container"
import { type SeatProps } from "~/services/rsvp/seat-management"
import { useRsvp } from "~/store/use-rsvp"
import { OrderContent } from "~/components/order-content"
import { listProducts } from "~/services/product/list"
import { Button } from "primereact/button"
import { parseStringify, useSubmitStringify } from "~/utils/use-submit–stringify"
import { postSubmitRsvp } from "~/services/rsvp/submission"
import { getObtainRsvpTicket } from "~/services/rsvp/obtain-ticket-rsvp"

export async function loader({ request, params }: LoaderArgs) {
  const { rsvpId } = params
  const ticket = await getObtainRsvpTicket(String(rsvpId))

  if (ticket.rsvp.status != "TICKET") {
    throw new Error("Not found")
  }

  const products = await listProducts()
  return json({ products, rsvpId: String(rsvpId) })
}

export async function action({ request, params }: ActionArgs) {
  const { rsvpId } = params
  const payload = await parseStringify<TObjUnknown>(request)

  await postSubmitRsvp(String(rsvpId), payload)
  return redirect("/rsvp/success")
}

export default function () {
  const { products, rsvpId } = useLoaderData<typeof loader>()
  const [seats, setSeats] = useState<SeatProps[] | null>(null)
  const { setSelectedSeat } = useRsvp()
  const fetcherSeat = useFetcher()
  const submitRsvp = useSubmitStringify()
  const { personalData, step, setStep, submit } = useRsvp()

  // const { capacity } = personalData

  const doFetchSeat = useCallback((date: string) => {
    fetcherSeat.load(`/rsvp/seat?date=` + date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fetcherSeat.data) {
      console.log(fetcherSeat.data)
      setSeats(fetcherSeat.data?.seats)
      // setSelectedSeat(null)
    }
  }, [fetcherSeat.data, setSelectedSeat])

  useEffect(() => {
    if (!window) return
    doFetchSeat(personalData.date.toISOString())
  }, [doFetchSeat, personalData.date])

  const handleSubmitRsvp = () => {
    const payload = {
      ...submit(),
      rsvpId,
    }
    console.log(payload)

    submitRsvp(payload, { method: "post" })
  }

  return (
    <div className="flex flex-col gap-y-5 pb-8">
      <div className="flex flex-col gap-y-2 my-5">
        <p className="text-2xl font-bold">
          Halo Kawula <span className="text-serua">Sérua</span>!
        </p>
        <p className="text-lg">Silahkan isi formulir untuk melakukan reservasi.</p>
      </div>
      <ol className="flex justify-around items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
        <li className={`flex items-center cursor-pointer ${step === "FORM" && "text-serua"}`} onClick={() => setStep("FORM")}>
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              step === "FORM" ? "border-serua" : "border-gray-500"
            }`}
          >
            1
          </span>
          Data Diri
        </li>
        <li className={`flex items-center cursor-pointer ${step === "ORDER" && "text-serua"}`} onClick={() => setStep("ORDER")}>
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              step === "ORDER" ? "border-serua" : "border-gray-500"
            }`}
          >
            2
          </span>
          Pesanan
        </li>
        <li
          className={`flex items-center cursor-pointer ${step === "CONFIRMATION" && "text-serua"}`}
          onClick={() => setStep("CONFIRMATION")}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              step === "CONFIRMATION" ? "border-serua" : "border-gray-500"
            }`}
          >
            3
          </span>
          Confirmation
        </li>
      </ol>

      {step === "FORM" ? (
        <>
          <div className="flex flex-col gap-y-5">
            <SeatContainer>
              {seats?.map((x) => (
                <Seat {...x} key={x.index} />
              ))}
            </SeatContainer>
            <RsvpForm />
          </div>
        </>
      ) : (
        <OrderContent products={products} />
      )}
      <div className="flex flex-row items-center bottom-0 sticky gap-x-5">
        <Button onClick={handleSubmitRsvp}>Submit</Button>
      </div>
    </div>
  )
}
