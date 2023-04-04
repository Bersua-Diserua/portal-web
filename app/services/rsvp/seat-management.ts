import { api } from "../core"

type SeatPosition = { [key in "top" | "right" | "bottom" | "left"]?: number | undefined | string } | undefined

export type SeatProps = {
  position?: SeatPosition
  size?: "large" | "medium" | "small" | "long"
  index: number
  status: "OPEN" | "RESERVED" | "SELECTED"
  capacity: {
    max: number
    min: number
  }
}

type ResSeatManagemet = TResponse<{ seats: SeatProps[] }>

export async function getSeatManagement() {
  const { data } = await api.get<ResSeatManagemet>("/rsvp/seat-management")
  return data.payload
}
