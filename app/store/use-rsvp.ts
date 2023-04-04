import { create } from "zustand"

interface RsvpState {
  selectedSeat: number | null
  setSelectedSeat: (seat: number | null) => void
}

const useRsvp = create<RsvpState>((set, get) => ({
  selectedSeat: null,
  setSelectedSeat(seat) {
    set({
      selectedSeat: seat,
    })
  },
}))

export { useRsvp }
