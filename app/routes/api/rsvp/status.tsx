import type { ActionArgs } from "@remix-run/node"
import type { UpdateStatusRecord } from "~/services/rsvp/management/update-status-record"
import { updateStatusRecord } from "~/services/rsvp/management/update-status-record"
import { getRequiredAuth } from "~/utils/authorization"
import { parseStringify, useFetcherStringify } from "~/utils/use-submit–stringify"

export async function action({ request }: ActionArgs) {
  const auth = await getRequiredAuth(request)
  const data = await parseStringify<UpdateStatusRecord>(request)
  await updateStatusRecord(data, auth)
  return null
}

export function useActionChangeStatus() {
  const fetcher = useFetcherStringify()

  const submit = (data: UpdateStatusRecord) => {
    fetcher.submit(data, {
      method: "post",
      action: "/api/rsvp/status",
    })
  }

  return [fetcher, submit] as const
}
