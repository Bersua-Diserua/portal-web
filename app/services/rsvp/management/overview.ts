import { z } from "zod"
import { api, getHeaders, resSchema } from "~/services/core"

export const rsvpRecordStatus = z.enum([
  "TICKET", // Generate ticket
  "SUBMISSION", // User do submission
  "SUBMISSION.APPROVE", // Submission user already approved by admin
  "RESOLVE", // Payment has received by admin
  "REJECT", // Rsvp submission has rejected by admin
])

const overviewSchema = z.object({
  status: rsvpRecordStatus,
  count: z.number().catch(0),
})

const summary = z.object({
  today: z.array(overviewSchema),
  month: z.array(overviewSchema),
})

const resOverview = resSchema(
  z.object({
    overview: summary,
  })
)

export type OverviewSchema = z.infer<typeof overviewSchema>

export async function getOverview(auth: Auth) {
  return (await api.get("/rsvp/management/overview", getHeaders(auth)).then((x) => resOverview.parse(x.data))).payload.overview
}
