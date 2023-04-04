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

  const persons = [
    {
      name: "2-4",
      value: {
        min: 2,
        max: 4,
      },
    },
    {
      name: "4-6",
      value: {
        min: 4,
        max: 6,
      },
    },
    {
      name: "6-12",
      value: {
        min: 6,
        max: 12,
      },
    },
    {
      name: "12-20",
      value: {
        min: 12,
        max: 20,
      },
    },
    {
      name: "20 lebih",
      value: {
        min: 20,
        max: 99,
      },
    },
  ]

  const [selectedPersons, setSelectedPersons] = useState({
    min: 2,
    max: 4,
  })

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
        <input type="time" />
        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tanggal
          </label>
          <Calendar
            id="date"
            className="w-full"
            value={date}
            onChange={(e) => setDate(e.value)}
            minDate={minDate}
            maxDate={maxDate}
            showIcon
          />
        </div>
        <div className="mb-6">
          <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jam
          </label>
          <Dropdown
            id="time"
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
          <Dropdown
            value={selectedPersons}
            onChange={(e) => setSelectedPersons(e.value)}
            options={persons}
            optionLabel="name"
            placeholder="Pilih jumlah orang"
            className="w-full md:w-14rem"
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