import type { RsvpRecordStatus } from "~/services/rsvp/status-types"

export const ALIAS: Record<RsvpRecordStatus, string> = {
  REJECT: "Ditolak",
  RESOLVE: "Diterima",
  SUBMISSION: "Permintaan",
  "SUBMISSION.APPROVE": "Permintaan disetujui",
  TICKET: "",
}

export const ALIAS_INVOICE: Record<RsvpRecordStatus, string> = {
  REJECT: "Ditolak",
  RESOLVE: "Diterima",
  SUBMISSION: "Menunggu Persetujuan",
  "SUBMISSION.APPROVE": "Menunggu Pembayaran",
  TICKET: "",
}

export function StatusRsvp(props: { status: RsvpRecordStatus }) {
  const { status } = props

  return <p>{ALIAS[status]}</p>
}
