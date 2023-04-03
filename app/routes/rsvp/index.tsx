import { RsvpForm } from "~/components/rsvp/form"
type STATE_FORM = "FORM" | "SEAT" | "MENU"
export default function () {
  const state: STATE_FORM = "FORM"
  return <>{state === "FORM" && <RsvpForm />}</>
}
