import { Controller, useForm } from "react-hook-form"
import { useCallback, useState } from "react"

import clsxm from "~/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type SeatContainerProps = {} & JSX.IntrinsicElements["div"]

export function SeatContainer(props: SeatContainerProps) {
  const { className, children, ...rest } = props
  return (
    <div {...rest} className={"border border-white w-full aspect-square rounded-md relative bg-gray-900"}>
      {children}
    </div>
  )
}

type SeatPosition = { [key in "top" | "right" | "bottom" | "left"]?: number | undefined | string } | undefined

type SeatProps = {} & JSX.IntrinsicElements["button"] & {
    position?: SeatPosition
    size?: "large" | "medium" | "small" | "long"
    index: number
    status: "OPEN" | "RESERVED" | "SELECTED"
    capacity: {
      max: number
      min: number
    }
  }

export function Seat(props: SeatProps) {
  const { position, size = "large", index, status, ...rest } = props

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

  const mapStatus: Record<typeof status, string> = {
    OPEN: "bg-green-400",
    RESERVED: "bg-red-300",
    SELECTED: "bg-green-800",
  }

  return (
    <button
      className={clsxm("absolute border rounded-md w-8 h-8", mapStatus[status])}
      style={{
        ...position,
        ...mapSize[size],
      }}
      {...rest}
      children={<p>{index}</p>}
    />
  )
}

const config: SeatProps[] = [
  {
    position: {
      top: "3%",
      left: "3%",
    },
    index: 1,
    size: "medium",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "3%",
      left: "18%",
    },
    index: 2,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "RESERVED",
  },
  {
    position: {
      top: "3%",
      left: "33%",
    },
    index: 3,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "3%",
      right: "33%",
    },
    index: 4,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "3%",
      right: "18%",
    },
    index: 5,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "3%",
      right: "3%",
    },
    index: 6,
    size: "medium",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "23%",
      right: "3%",
    },
    index: 7,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "23%",
      right: "3%",
    },
    index: 8,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "3%",
      right: "3%",
    },
    index: 9,
    size: "medium",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "3%",
      left: "3%",
    },
    index: 10,
    size: "medium",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "23%",
      left: "3%",
    },
    index: 11,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "23%",
      left: "3%",
    },
    index: 12,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "28%",
      left: "22%",
    },
    index: 13,
    size: "large",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      top: "28%",
      right: "22%",
    },
    index: 14,
    size: "large",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "-1%",
      left: "22%",
    },
    index: 15,
    size: "long",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "-1%",
      right: "22%",
    },
    index: 16,
    size: "long",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
  {
    position: {
      bottom: "20%",
      right: "21%",
    },
    index: 17,
    size: "small",
    capacity: {
      max: 6,
      min: 3,
    },
    status: "OPEN",
  },
]

const schema = z.object({
  capacity: z.preprocess(Number, z.number()),
})

export function Sample1() {
  const { register, watch, control } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null)

  const handleSeatOnClick = useCallback(
    (config: SeatProps) => {
      const capacityRequest = watch("capacity")

      if (capacityRequest > config.capacity.max) {
        alert("No more capacity")
        return
      }

      if (config.status === "RESERVED") {
        return alert(`Already reserved`)
      }

      if (selectedIndex === config.index) {
        setSelectedIndex(null)
        return
      }

      setSelectedIndex(config.index)
    },
    [selectedIndex, setSelectedIndex, watch]
  )

  const validate = () => {
    setSelectedIndex(null)
  }

  return (
    <div>
      <form>
        <Controller
          name="capacity"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              {...field}
              className="text-red-900"
              onBlur={() => {
                validate()
                field.onBlur()
              }}
            />
          )}
        />
      </form>
      <SeatContainer>
        {config.map((x) => (
          <Seat {...x} key={x.index} onClick={() => handleSeatOnClick(x)} status={selectedIndex === x.index ? "SELECTED" : x.status} />
        ))}
      </SeatContainer>
    </div>
  )
}
