import { api } from "../core"
import qs from "querystring"

type SeatPosition = { [key in "top" | "right" | "bottom" | "left"]?: number | undefined | string } | undefined

export type SeatProps = {
  position?: SeatPosition
  size?: "large" | "medium" | "small" | "long"
  index: number
  status: "OPEN" | "RESERVED" | "SELECTED" | "LOCKED"
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

type ResSeatManagemetV2 = TResponse<{ seats: SeatProps[]; date: string }>
export async function getSeatByDate(date: string) {
  const query = qs.stringify({ date })
  const { data } = await api.get<ResSeatManagemetV2>("/rsvp/seat?" + query)
  return data.payload
}
