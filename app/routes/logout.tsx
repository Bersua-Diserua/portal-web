import type { LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { destroySession, getSession } from "~/utils/session.server"
import { getAuthorization } from "~/utils/authorization"

export async function loader({ request }: LoaderArgs) {
  const auth = await getAuthorization(request)
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(auth?.session || (await getSession())),
    },
  })
}

export default function () {
  return null
}
