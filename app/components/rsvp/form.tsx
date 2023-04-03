import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import type { Nullable } from "primereact/ts-helpers"
import { useState } from "react"

export function RsvpForm() {
  const hours = [
    {
      name: "15.00",
      value: "15.00",
    },
    {
      name: "16.00",
      value: "16.00",
    },
    {
      name: "17.00",
      value: "17.00",
    },
    {
      name: "18.00",
      value: "18.00",
    },
  ]
  const [selectedHour, setSelectedHour] = useState("15.00")

  const dateNow = new Date()
  const [date, setDate] = useState<Nullable<string | Date | Date[]>>(dateNow)
  const maxDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1))
  const minDate = dateNow

  return (
    <>
      <form>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nama
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            No. Handphone
          </label>
          <input
            type="text"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tanggal
          </label>
          <Calendar className="w-full" value={date} onChange={(e) => setDate(e.value)} minDate={minDate} maxDate={maxDate} showIcon />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jam
          </label>
          <Dropdown
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.value)}
            options={hours}
            optionLabel="name"
            placeholder="Pilih jam yang diinginkan"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jumlah Orang
          </label>
          <input
            type="number"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Jumlah orang"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  )
}
