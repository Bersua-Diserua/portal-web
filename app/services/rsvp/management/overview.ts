import { z } from "zod"
import { api, getHeaders, resSchema } from "~/services/core"
import { rsvpRecordStatus } from "../status-types"

const overviewSchema = z.object({
  status: rsvpRecordStatus,
  count: z.number().catch(0),
})

const summary = z.object({
  today: z.array(overviewSchema),
  month: z.array(overviewSchema),
  ago: z.array(overviewSchema),
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
