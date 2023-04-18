import "moment/locale/id"

import { ALIAS_INVOICE } from "./status"
import { type RsvpRecordStatus } from "~/services/rsvp/status-types"
import { currency } from "~/utils/currency-formatter"
import moment from "moment"

type ProductProps = {
  name: string
  desc: string
  count: number
  price: number
  total: number
}

export type InvoiceProps = {
  typeInvoice: "CONFIRMATION" | "INVOICE"
  invoiceNumber?: string
  name: string
  date: string
  phone: string
  products: ProductProps[]
  total: number
  time: string
  seatIndex: number
  status: RsvpRecordStatus
  rejectedReason: string | null
}

export function Invoice(props: { data: InvoiceProps }) {
  const { data } = props

  return (
    <div className="flex flex-col w-full p-5 rounded-xl shadow-2xl gap-y-8 bg-white text-xs md:text-md">
      <div className="flex flex-row justify-between items-center">
        <img className="h-full w-44 object-cover" src="https://ik.imagekit.io/bersuadiserua22/icons/serua-transparent.png" alt="logo" />
        {data.typeInvoice === "INVOICE" && (
          <div className="flex flex-col gap-y-2">
            <p>Invoice</p>
            <p className="uppercase">SERUA/{data.invoiceNumber}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-between">
        <p>
          Diterbitkan oleh <span className="text-serua">Sèrua</span>
        </p>
        <div className="flex flex-col gap-y-2">
          <p className="font-bold text-black">Untuk</p>
          <div className="grid grid-cols-2">
            <p>Nama</p>
            <p className="text-black font-bold capitalize">: {data.name}</p>
            <p>Tanggal Reservasi</p>
            <p className="text-black font-bold">: {`${moment(data.date).locale("id").format("ddd, DD MMMM YYYY")} - ${data.time}`}</p>
            <p>Meja</p>
            <p className="text-black font-bold">: {data.seatIndex}</p>
            <p>Nomor Whatsapp</p>
            <p className="text-black font-bold">: {data.phone}</p>
            {data.typeInvoice === "INVOICE" && (
              <>
                <p>Status</p>
                <p className="text-black font-bold">: {ALIAS_INVOICE[data.status]}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-y-8">
        <img
          src="https://ik.imagekit.io/bersuadiserua22/icons/serua-logo.png"
          alt=""
          className="absolute h-full w-full object-contain opacity-10"
        />
        <table className="table-fixed">
          <thead>
            <tr className="border-y-2 border-black whitespace-nowrap">
              <th className="py-4 text-left">Item</th>
              <th className="py-4 text-right">Jumlah</th>
              <th className="py-4 text-right">Harga</th>
              <th className="py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((val, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="py-4 text-left">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-sm lg:text-xl font-bold">{val.name}</p>
                    <p className="text-xs">{val.desc}</p>
                  </div>
                </td>
                <td className="py-4 text-center md:text-right">{val.count}</td>
                <td className="py-4 text-right">{currency.format(val.price)}</td>
                <td className="py-4 text-right">{currency.format(val.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col items-end border-b border-gray-400 pb-4">
          <div className="flex flex-col w-full md:w-1/2">
            <div className="flex flex-row justify-between font-bold text-black">
              <p className="uppercase">Total Harga ({data.products.length} barang)</p>
              <p>{currency.format(data.total)}</p>
            </div>
          </div>
        </div>
      </div>
      {data.status === "REJECT" && (
        <div className="flex flex-col items-center justify-center gap-y-1 border-y-2 border-red-500 py-2">
          <p className="text-sm font-bold">Alasan Ditolak</p>
          <p>{data.rejectedReason}</p>
        </div>
      )}
      <div className="flex flex-col gap-y-1 text-xs">
        <p>Invoice ini sah dan diproses oleh komputer</p>
        <p>
          Silakan hubungi{" "}
          <a href={`https://wa.me/6287766685825`} className="text-serua font-bold">
            SEVA (Serua Virtual Assistant)
          </a>{" "}
          apabila kamu membutuhkan bantuan.
        </p>
      </div>
    </div>
  )
}
