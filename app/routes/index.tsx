import type { LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { Header } from "~/components/ui/header"
import { getAuthorization } from "~/utils/authorization"

export async function loader({ request }: LoaderArgs) {
  const auth = await getAuthorization(request)

  if (!auth) {
    throw redirect("/auth/signin")
  }
  return redirect("/dashboard")
}

export default function Index() {
  return (
    <div className="">
      <Header />
    </div>
  )
}
