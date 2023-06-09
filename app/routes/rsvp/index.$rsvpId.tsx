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
import clsxm from "~/utils"
import { useOrder } from "~/store/use-order"
import { parsePhoneNumber } from "~/utils/phone-number"

export async function loader({ request, params }: LoaderArgs) {
  const { rsvpId } = params
  const ticket = await getObtainRsvpTicket(String(rsvpId))

  if (ticket.rsvp.status != "TICKET") {
    throw redirect(`/invoice/${rsvpId}`)
  }

  const products = await listProducts()
  const { phoneNumber } = ticket.rsvp
  return json({ products, rsvpId: String(rsvpId), phoneNumber })
}

export async function action({ request, params }: ActionArgs) {
  const { rsvpId } = params
  const payload = await parseStringify<TObjUnknown>(request)

  await postSubmitRsvp(String(rsvpId), payload)
  return redirect(`/invoice/${rsvpId}`)
}

export default function () {
  const { products, rsvpId, phoneNumber } = useLoaderData<typeof loader>()
  const [seats, setSeats] = useState<SeatProps[] | null>(null)
  const { setSelectedSeat } = useRsvp()
  const fetcherSeat = useFetcher()
  const submitRsvp = useSubmitStringify()
  const { personalData, step, setStep, submit, error, setError } = useRsvp()
  const { products: listProduct } = useOrder()
  const [scrolled, setScrolled] = useState(false)

  const doFetchSeat = useCallback((date: string) => {
    fetcherSeat.load(`/rsvp/seat?date=` + date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fetcherSeat.data) {
      console.log(fetcherSeat.data)
      setSeats(fetcherSeat.data?.seats)
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
      submitRsvp(payload, { method: "post" })
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
    ...submit(),
    status: "SUBMISSION",
    typeInvoice: "CONFIRMATION",
    phone: "62" + parsePhoneNumber(submit().phoneNumber),
    rejectedReason: null,
    products: Array.from(listProduct).map((x) => {
      const [, val] = x
      return {
        count: val.count,
        name: val.name,
        price: val.price,
        total: val.count * val.price,
        desc: val.note,
      }
    }),
    total: Array.from(listProduct).reduce<number>((prev, curr) => {
      const [, val] = curr
      return (prev += val.count * val.price)
    }, 0),
  }

  return (
    <div className="flex flex-col gap-y-5 pb-8">
      <div className="flex flex-col gap-y-2 my-5">
        <p className="text-2xl font-bold">
          Halo Kawula <span className="text-serua">Sérua</span>!
        </p>
        <p className="text-lg">Silahkan isi formulir untuk melakukan reservasi.</p>
      </div>
      <ol className="flex justify-around items-center w-full p-3 space-x-2 text-xs md:text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 top-0">
        <li className={`flex items-center cursor-pointer ${step === "FORM" && "text-serua"}`} onClick={() => setStep("FORM")}>
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${
              step === "FORM" ? "border-serua" : "border-gray-500"
            }`}
          >
            1
          </span>
          Informasi
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
          Konfirmasi
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
              <div className="w-max flex flex-col gap-3 items-center bg-[#0f172a] text-white rounded-lg py-5 px-8 md:px-10 text-xs md:text-sm">
                <div className="flex flex-row gap-x-8">
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.LOCKED}`}></div>
                    <p>Dikunci</p>
                  </div>

                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.RESERVED}`}></div>
                    <p>Sudah Dipesan</p>
                  </div>

                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.HOLD}`}></div>
                    <p>Menunggu Konfirmasi</p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-8">
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.SELECTED}`}></div>
                    <p>Pilihan Kamu</p>
                  </div>
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className={`h-5 w-5 rounded-full border ${mapStatus.OPEN}`}></div>
                    <p>Terbuka</p>
                  </div>
                </div>
              </div>
            </div>
            <RsvpForm phoneNumber={phoneNumber} />
          </div>
        </>
      )}
      {step === "ORDER" && <OrderContent products={products} />}
      {step === "CONFIRMATION" && <Invoice data={mockConfirmation} />}
      {scrolled && (
        <div className="flex sticky bottom-20 justify-end">
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
      <div
        className={clsxm(
          "flex flex-row items-center gap-x-5 justify-end",
          step === "FORM" ? "justify-end" : "justify-between",
          step === "ORDER" && scrolled ? "sticky bottom-4" : ""
        )}
      >
        {step !== "FORM" && (
          <Button className="shadow-lg" severity="secondary" onClick={() => (step === "ORDER" ? setStep("FORM") : setStep("ORDER"))}>
            Previous
          </Button>
        )}
        <Button
          className="shadow-2xl"
          onClick={handleSubmitRsvp}
          style={{ backgroundColor: "#0f172a", border: "#0f172a" }}
          onMouseOver={(event) => (event.currentTarget.style.backgroundColor = "#070b15")}
          onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = "#0f172a")}
        >
          Next
        </Button>
      </div>
      <Dialog className="w-[80vw] lg:w-[50vw]" header="UPSSS!!! ADA YANG SALAH NIHH!!" visible={!!error} onHide={() => setError("")}>
        <p className="m-0">{error}</p>
      </Dialog>
    </div>
  )
}
