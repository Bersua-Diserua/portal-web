import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import moment from "moment"
import { useEffect } from "react"
import type { PersonalDataSchema } from "~/store/use-rsvp"
import { personalDataSchema, persons, useRsvp } from "~/store/use-rsvp"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const hours = [
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

export function RsvpForm() {
  const { personalData, setPartial, setPersonalData } = useRsvp()
  const { watch, setValue, register, getValues } = useForm<PersonalDataSchema>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: personalData,
  })

  const dateNow = moment().toDate()
  const utilsDate = {
    max: moment().add(30, "days").toDate(),
    min: dateNow,
  }

  useEffect(() => {
    return () => setPersonalData(getValues())
  }, [getValues, setPersonalData])

  return (
    <>
      <form>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nama
          </label>
          <input
            {...register("name")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            No. Handphone
          </label>
          <input
            {...register("phoneNumber")}
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
            value={getValues("date")}
            onChange={(e) => {
              if (!e.value) return
              setValue("date", new Date(e.value.toString()))
              setPartial("date", new Date(e.value.toString()))
            }}
            minDate={utilsDate.min}
            maxDate={utilsDate.max}
            showIcon
          />
        </div>
        <div className="mb-6">
          <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jam
          </label>
          <Calendar
            className="w-full"
            id="calendar-timeonly"
            value={watch("time")}
            onChange={(e) => {
              if (!e.value) return
              setValue("time", new Date(e.value.toString()))
            }}
            timeOnly
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jumlah Orang
          </label>
          <Dropdown
            value={watch("capacity")}
            onChange={(e) => setValue("capacity", e.target.value)}
            options={persons}
            optionLabel="name"
            placeholder="Pilih jumlah orang"
            className="w-full md:w-14rem"
          />
        </div>
        {/* <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button> */}
      </form>
    </>
  )
}
