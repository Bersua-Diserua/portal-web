import type { ActionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json, type LoaderArgs } from "@remix-run/node"
import { RsvpForm } from "~/components/rsvp/form"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"
import { mapStatus, Seat, SeatContainer } from "~/components/rsvp/seat-container"
import { type SeatProps } from "~/services/rsvp/seat-management"
import { useRsvp } from "~/store/use-rsvp"
import { OrderContent } from "~/components/order-content"
import { listProducts } from "~/services/product/list"
import { Button } from "primereact/button"
import { parseStringify, useSubmitStringify } from "~/utils/use-submit–stringify"
import { postSubmitRsvp } from "~/services/rsvp/submission"
import { getObtainRsvpTicket } from "~/services/rsvp/obtain-ticket-rsvp"
import { Invoice, type InvoiceProps } from "~/components/rsvp/invoice"
import { Dialog } from "primereact/dialog"

export async function loader({ request, params }: LoaderArgs) {
  const { rsvpId } = params
  const ticket = await getObtainRsvpTicket(String(rsvpId))

  console.log({ ticket })

  if (ticket.rsvp.status != "TICKET") {
    throw redirect("/rsvp/success")
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
  const { personalData, step, setStep, submit, error, setError } = useRsvp()
  const [scrolled, setScrolled] = useState(false)

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

    if (step === "FORM") {
      setStep("ORDER")
    } else if (step === "ORDER") {
      setStep("CONFIRMATION")
    } else {
      // submitRsvp(payload, { method: "post" })
      window.location.href = "/invoice/1"
    }
  }

  useEffect(() => {
    const scrollFunction = () => {
      if (Math.round(window.scrollY) == 0) {
        setScrolled(false)
      } else {
        setScrolled(true)
      }
    }
    window.addEventListener("scroll", scrollFunction)
    return () => window.removeEventListener("scroll", scrollFunction)
  }, [])

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const mockConfirmation: InvoiceProps = {
    typeInvoice: "CONFIRMATION",
    name: "Rei Mock",
    date: new Date().toISOString(),
    phone: "628xxxx",
    products: [
      {
        name: "Mock 1",
        desc: "Desc mock 1",
        count: "2",
        price: "1000",
        total: "2000",
      },
    ],
    total: "3000",
  }

  return (
    <div className="flex flex-col gap-y-5 pb-8">
      <div className="flex flex-col gap-y-2 my-5">
        <p className="text-2xl font-bold">
          Halo Kawula <span className="text-serua">Sérua</span>!
        </p>
        <p className="text-lg">Silahkan isi formulir untuk melakukan reservasi.</p>
      </div>
      <ol className="flex justify-around items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 top-0">
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

      {step === "FORM" && (
        <>
          <div className="flex flex-col gap-y-8">
            <SeatContainer>
              {seats?.map((x) => (
                <Seat {...x} key={x.index} />
              ))}
            </SeatContainer>
            <div className="w-full flex flex-row justify-center">
              <div className="w-max flex flex-col gap-2 items-center bg-[#0f172a] text-white rounded-lg py-5 px-10">
                <div className="flex flex-row gap-x-8">
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.LOCKED}`}></div>
                    <p>Locked</p>
                  </div>

                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.RESERVED}`}></div>
                    <p>Reserved</p>
                  </div>

                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.SELECTED}`}></div>
                    <p>Selected</p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-8">
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.OPEN}`}></div>
                    <p>Open</p>
                  </div>
                </div>
              </div>
            </div>
            <RsvpForm />
          </div>
        </>
      )}
      {step === "ORDER" && <OrderContent products={products} />}
      {step === "CONFIRMATION" && <Invoice data={mockConfirmation} />}
      <div className="flex flex-row justify-between items-center gap-x-5">
        {step !== "FORM" && (
          <Button severity="secondary" onClick={() => (step === "ORDER" ? setStep("FORM") : setStep("ORDER"))}>
            Previous
          </Button>
        )}
        <Button
          onClick={handleSubmitRsvp}
          style={{ backgroundColor: "#0f172a", border: "#0f172a" }}
          onMouseOver={(event) => (event.currentTarget.style.backgroundColor = "#070b15")}
          onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = "#0f172a")}
        >
          Next
        </Button>
      </div>
      {scrolled && (
        <div className="flex sticky bottom-4 justify-end">
          <div className="rounded-full supports-backdrop-blur:bg-serua/80 p-3 text-white cursor-pointer" onClick={backToTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
            </svg>
          </div>
        </div>
      )}
      <Dialog header="Header" visible={!!error} style={{ width: "50vw" }} onHide={() => setError("")}>
        <p className="m-0">{error}</p>
      </Dialog>
    </div>
  )
}
