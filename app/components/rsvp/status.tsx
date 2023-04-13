import type { RsvpRecordStatus } from "~/services/rsvp/status-types"

const ALIAS: Record<RsvpRecordStatus, string> = {
  REJECT: "Ditolak",
  RESOLVE: "Diterima",
  SUBMISSION: "Permintaan",
  "SUBMISSION.APPROVE": "Permintaan disetujui",
  TICKET: "",
}

export function StatusRsvp(props: { status: RsvpRecordStatus }) {
  const { status } = props

  return <p>{ALIAS[status]}</p>
}
