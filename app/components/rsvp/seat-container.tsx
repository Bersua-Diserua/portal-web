import clsxm from "~/utils"
import { useRsvp } from "~/store/use-rsvp"

type SeatContainerProps = {} & JSX.IntrinsicElements["div"]

export function SeatContainer(props: SeatContainerProps) {
  const { className, children, ...rest } = props
  return (
    <div {...rest} className={"border border-white w-full aspect-square rounded-lg relative bg-[#0f172a]"}>
      <div className="bg-red-200 w-[65%] h-[70%] top-[15%] left-[18%] absolute rounded-lg" />
      <div className="bg-red-500 w-[35%] h-[15%] bottom-[20%] left-[32%] absolute rounded-lg flex items-center justify-center">Bar</div>
      {children}
    </div>
  )
}

type SeatPosition = { [key in "top" | "right" | "bottom" | "left"]?: number | undefined | string } | undefined

type SeatProps = {
  position?: SeatPosition
  size?: "large" | "medium" | "small" | "long"
  index: number
  status: "OPEN" | "RESERVED" | "SELECTED" | "LOCKED" | "HOLD"
  capacity: {
    max: number
    min: number
  }
}

const mapSize: Record<NonNullable<SeatProps["size"]>, { width: number | undefined | string; height: number | undefined | string }> = {
  large: {
    height: "14%",
    width: "24%",
  },
  medium: {
    height: "17%",
    width: "12%",
  },
  small: {
    height: "10%",
    width: "10%",
  },
  long: {
    height: "5%",
    width: "25%",
  },
}

export const mapStatus: Record<SeatProps["status"], string> = {
  OPEN: "bg-green-400",
  RESERVED: "bg-serua",
  SELECTED: "bg-[#ecbb58]",
  LOCKED: "bg-[#c8232b]",
  HOLD: "bg-purple-500",
}

export function Seat(props: SeatProps & JSX.IntrinsicElements["button"]) {
  let { position, size = "large", index, capacity, status, ...rest } = props
  const {
    selectedSeat,
    personalData: { capacity: selectedCapacity },
    setSelectedSeat,
    setError,
  } = useRsvp()

  const { max, min } = selectedCapacity

  let reason = "Unreachable condition"

  if (status != "RESERVED") {
    if (selectedSeat == index) {
      status = "SELECTED"
    }
    if (min < capacity.min || max > capacity.max) {
      status = "LOCKED"
      reason =
        min < capacity.min ? `Minimal orang untuk meja ${index} : ${capacity.min}` : `Maksimal orang untuk meja ${index} : ${capacity.max}`
    }
  }

  if (status == "RESERVED") {
    reason = `Meja ${index} telah dipesan`
  }

  if (status == "HOLD") {
    reason = "Mohon tunggu 10-15 menit, karena meja sedang dipesan"
  }

  const handleOnClick = () => {
    if (status === "RESERVED" || status === "LOCKED" || status === "HOLD") {
      return setError(reason)
    }

    if (selectedSeat === index) {
      setSelectedSeat(null)
      return
    }

    setSelectedSeat(index)
  }

  return (
    <>
      <button
        {...rest}
        className={clsxm("absolute border rounded-md w-8 h-8 text-white font-bold", mapStatus[status])}
        style={{
          ...position,
          ...mapSize[size],
        }}
        onClick={handleOnClick}
      >
        <p>{index}</p>
      </button>
    </>
  )
}
