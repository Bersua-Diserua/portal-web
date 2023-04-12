import { personalDataSchema, persons, useRsvp } from "~/store/use-rsvp"

import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import type { PersonalDataSchema } from "~/store/use-rsvp"
import moment from "moment"
import { parsePhoneNumber } from "../../utils/phone-number"
import { useEffect } from "react"
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

type FormPropsType = {
  phoneNumber: string
}

export function RsvpForm(props: FormPropsType) {
  const { phoneNumber } = props
  const { personalData, setPartial, setPersonalData, setSelectedSeat } = useRsvp()
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
    if (phoneNumber) setValue("phoneNumber", parsePhoneNumber(phoneNumber))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => setPersonalData(getValues())
  }, [getValues, setPersonalData])

  return (
    <form>
      <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Jumlah Orang
        </label>
        <Dropdown
          value={watch("capacity")}
          onChange={(e) => {
            setPartial("capacity", e.target.value)
            setValue("capacity", e.target.value)
            setSelectedSeat(null)
          }}
          options={persons}
          optionLabel="name"
          placeholder="Pilih jumlah orang"
          className="w-full md:w-14rem"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nama
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Masukkan nama kamu"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Masukkan email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          No. Handphone
        </label>
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500">+62</span>
            </div>
            <input
              {...register("phoneNumber")}
              type="number"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-11"
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tanggal
        </label>
        <Calendar
          id="date"
          className="w-full"
          value={getValues("date")}
          dateFormat="dd MM yy"
          onChange={(e) => {
            if (!e.value) return
            setValue("date", new Date(e.value.toString()))
            setPartial("date", new Date(e.value.toString()))
          }}
          minDate={utilsDate.min}
          maxDate={utilsDate.max}
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
    </form>
  )
}
