import { json, type LoaderArgs } from "@remix-run/node"
import { RsvpForm } from "~/components/rsvp/form"
import { RsvpSeat } from "~/components/rsvp/seat"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
type STATE_FORM = "FORM" | "SEAT" | "MENU"

export async function loader({ request }: LoaderArgs) {
  return json<{
    seats: { index: number; status: "EMPTY" | "SUBMISSION" | "APPROVED" }[]
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
  })
}
export default function () {
  const [formState, setFormState] = useState<STATE_FORM>("SEAT")
  const { seats: seatsBooked } = useLoaderData<typeof loader>()
  return (
    <>
      {formState === "FORM" && <RsvpForm />}
      {formState === "SEAT" && (
        <>
          <div className="bg-gray-900 p-5 text-white">
            <RsvpSeat seatsBooked={seatsBooked} />
          </div>
        </>
      )}
    </>
  )
}
