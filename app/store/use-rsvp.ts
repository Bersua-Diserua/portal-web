import { z } from "zod"
import { create } from "zustand"

export const personalDataSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().min(1),
  time: z.instanceof(Date),
  date: z.instanceof(Date),
  capacity: z.object({
    min: z.number(),
    max: z.number(),
  }),
})

export type PersonalDataSchema = z.infer<typeof personalDataSchema>

export const persons = [
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

interface RsvpState {
  selectedSeat: number | null
  setSelectedSeat: (seat: number | null) => void
  personalData: PersonalDataSchema
  setPersonalData: (data: PersonalDataSchema) => void
  setPartial: <TKey extends keyof PersonalDataSchema, TVal extends PersonalDataSchema[TKey]>(key: TKey, val: TVal) => void
}

const useRsvp = create<RsvpState>((set, get) => ({
  selectedSeat: null,
  setSelectedSeat(seat) {
    set({
      selectedSeat: seat,
    })
  },
  personalData: {
    name: "",
    phoneNumber: "",
    time: new Date(),
    date: new Date(),
    capacity: persons[0].value,
  },
  setPersonalData(data) {
    set({ personalData: data })
  },
  setPartial(key, val) {
    const { personalData } = get()
    set({
      personalData: {
        ...personalData,
        [key]: val,
      },
    })
  },
}))

export { useRsvp }
