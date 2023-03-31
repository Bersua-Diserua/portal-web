import type { LoaderArgs } from "@remix-run/node";
import { useMemo, useState } from "react";
import clsxm from "~/utils";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  return json<{
    seats: { index: number; status: "EMPTY" | "SUBMISSION" | "APPROVED" }[];
  }>({
    seats: [
      {
        index: 1,
        status: "APPROVED",
      },
      {
        index: 9,
        status: "APPROVED",
      },
    ],
  });
}

type SeatConfig = {
  index: number;
  capacity: number;
  positionCss: string;
};

const mock: SeatConfig[] = [
  {
    index: 1,
    positionCss: "w-[15%] h-[15%] left-[5%] top-[5%]",
    capacity: 1,
  },
  {
    index: 2,
    positionCss: "w-[15%] h-[15%] left-[5%] top-[25%]",
    capacity: 1,
  },
  {
    index: 3,
    positionCss: "w-[15%] h-[15%] left-[5%] bottom-[25%]",
    capacity: 1,
  },
  {
    index: 4,
    positionCss: "w-[15%] h-[15%] left-[5%] bottom-[5%]",
    capacity: 1,
  },
  {
    index: 5,
    positionCss: "w-[15%] h-[15%] right-[5%] top-[5%]",
    capacity: 1,
  },
  {
    index: 6,
    positionCss: "w-[15%] h-[15%] right-[5%] top-[25%]",
    capacity: 1,
  },
  {
    index: 7,
    positionCss: "w-[15%] h-[15%] right-[5%] bottom-[5%]",
    capacity: 1,
  },
  {
    index: 8,
    positionCss: "w-[15%] h-[15%] right-[5%] bottom-[25%]",
    capacity: 1,
  },
  {
    index: 9,
    positionCss: "w-[22%] h-[14%] left-[25%] bottom-[30%]",
    capacity: 1,
  },
  {
    index: 10,
    positionCss: "w-[22%] h-[14%] right-[25%] bottom-[30%]",
    capacity: 1,
  },
];

export default function () {
  const { seats: seatsBooked } = useLoaderData<typeof loader>();
  const [selected, setSelected] = useState<SeatConfig | null>(null);

  const seats = useMemo(() => {
    const register = (
      idx: number,
      className: string
    ): JSX.IntrinsicElements["button"] => {
      const booking = seatsBooked.find((x) => x.index === idx) || {
        index: idx,
        status: "EMPTY",
      };

      const isActive = booking.status === "APPROVED";
      return {
        onClick: () => {
          setSelected((old) =>
            old?.index == idx ? null : mock.find((x) => x.index == idx)!
          );
        },
        children: idx,
        className: clsxm(className, "border absolute", [
          isActive && "bg-red-200",
          selected?.index === idx && "bg-red-500",
        ]),
      };
    };
    return mock.map((x) => (
      <button key={x.index} {...register(x.index, x.positionCss)} />
    ));
  }, [selected, setSelected, seatsBooked]);

  return (
    <>
      <p>Table Management</p>
      <div>
        <div className="border border-red-100 aspect-square relative">
          {seats}
          <div className="border w-[30%] h-[10%] absolute bottom-[-2%] right-[50%] translate-x-[50%]" />
          <div className="border w-[45%] h-[10%] absolute top-[20%] right-[50%] translate-x-[50%]" />
        </div>
      </div>
      <p>Selected</p>
      {selected && (
        <>
          <p>{selected.index}</p>
          <p>{selected.capacity}</p>
        </>
      )}
    </>
  );
}
