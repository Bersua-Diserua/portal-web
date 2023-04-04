import clsxm from "~/utils"

export type SeatConfig = {
  index: number
  capacity: number
  positionCss: string
}

const SQUARE = "w-[12%] h-[12%]"
const RECTANGLE = "w-[12%] h-[17%]"

export const mock: SeatConfig[] = [
  {
    index: 1,
    positionCss: clsxm("left-[3%] top-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 2,
    positionCss: clsxm("left-[18%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 3,
    positionCss: clsxm("left-[33%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 4,
    positionCss: clsxm("right-[33%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 5,
    positionCss: clsxm("right-[18%] top-[3%]", SQUARE),
    capacity: 1,
  },
  {
    index: 6,
    positionCss: clsxm("right-[3%] top-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 7,
    positionCss: clsxm("right-[3%] top-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 8,
    positionCss: clsxm("right-[3%] bottom-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 9,
    positionCss: clsxm("right-[3%] bottom-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 10,
    positionCss: clsxm("left-[3%] bottom-[3%]", RECTANGLE),
    capacity: 1,
  },
  {
    index: 11,
    positionCss: clsxm("left-[3%] bottom-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 12,
    positionCss: clsxm("left-[3%] top-[23%]", SQUARE),
    capacity: 1,
  },
  {
    index: 13,
    positionCss: "w-[24%] h-[14%] left-[22%] top-[28%]",
    capacity: 1,
  },
  {
    index: 14,
    positionCss: "w-[24%] h-[14%] right-[22%] top-[28%]",
    capacity: 1,
  },
  {
    index: 15,
    positionCss: "w-[25%] h-[5%] left-[22%] bottom-[-1%]",
    capacity: 1,
  },
  {
    index: 16,
    positionCss: "w-[25%] h-[5%] right-[22%] bottom-[-1%]",
    capacity: 1,
  },
  {
    index: 17,
    positionCss: clsxm("right-[21%] bottom-[20%]", SQUARE),
    capacity: 1,
  },
]
