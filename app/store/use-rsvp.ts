import { z } from "zod"
import { create } from "zustand"
import type { ProductsSubmission } from "./use-order"
import { useOrder } from "./use-order"

export const personalDataSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().min(1),
  time: z.instanceof(Date),
  date: z.instanceof(Date),
  email: z.string().email(),
  capacity: z.object({
    min: z.number(),
    max: z.number(),
  }),
})

type RsvpSubmission = {
  phoneNumber: string
  name: string
  email: string
  date: string
  time: string
  seatIndex: number
  capacity: string
  capacityNumber: number
  transaction: {
    amount: number
  }
  products: ProductsSubmission["products"]
}

export type PersonalDataSchema = z.infer<typeof personalDataSchema>

export const persons = [
  {
    name: "1-3",
    value: {
      min: 1,
      max: 3,
    },
  },
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
  ref: null | HTMLInputElement
  step: "FORM" | "ORDER" | "CONFIRMATION"
  setStep: (nextStep: RsvpState["step"]) => void
  selectedSeat: number | null
  setSelectedSeat: (seat: number | null) => void
  personalData: PersonalDataSchema
  setPersonalData: (data: PersonalDataSchema) => void
  setPartial: <TKey extends keyof PersonalDataSchema, TVal extends PersonalDataSchema[TKey]>(key: TKey, val: TVal) => void
  submit: () => RsvpSubmission
}

const useRsvp = create<RsvpState>((set, get) => ({
  ref: null,
  step: "FORM",
  setStep(nextStep) {
    const { step: before, selectedSeat } = get()
    if (before === "FORM" && nextStep === "ORDER") {
      if (!selectedSeat) {
        alert("Tolong isi data diri terlebih dahulu")
        nextStep = "FORM"
      }
    }
    set({ step: nextStep })
  },
  selectedSeat: null,
  setSelectedSeat(seat) {
    console.log({ seat })

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
    email: "",
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
  submit() {
    const {
      personalData: { phoneNumber, name, email, date, time, capacity },
      selectedSeat,
    } = get()
    const { products, amount } = useOrder.getState().toJson()

    return {
      phoneNumber,
      name,
      email,
      date: date.toISOString(),
      time: `${time.getHours()}: ${time.getMinutes()}`,
      seatIndex: selectedSeat as number,
      capacity: `${capacity.min}-${capacity.max}`,
      capacityNumber: capacity.max,
      transaction: {
        amount,
      },
      products,
    }
  },
}))

export { useRsvp }
