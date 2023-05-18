import { z } from "zod"
import { getHeaders } from "~/services/core"
import { api } from "~/services/core"

export const groupType = z.enum(["today", "month", "ago"])

type GroupType = z.infer<typeof groupType>

export async function listRecordsByGroup(groupType: GroupType, auth: Auth) {
  const { data } = await api.get("/rsvp/management/record/group", {
    ...getHeaders(auth),
    params: { type: groupType },
  })

  return data
}
