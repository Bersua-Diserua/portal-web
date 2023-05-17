import type { LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { Sidebar, SidebarProvider } from "~/components/sidebar"
import { Header } from "~/components/ui/header"
import { getAuthorization } from "~/utils/authorization"
import clsxm from "~/utils"

export async function loader({ request }: LoaderArgs) {
  const auth = await getAuthorization(request)

  if (!auth) {
    throw redirect("/auth/signin")
  }

  return null
}

export default function () {
  return (
    <SidebarProvider>
      {({ isOpen }) => (
        <>
          <Header />
          <Sidebar />
          <div
            className={clsxm("md:pl-[4rem]", {
              "md:ml-[var(--sidebar-width)]": isOpen,
            })}
            style={{ transition: "margin-left .25s" }}
          >
            <div className="py-5 px-5 text-xs md:text-sm">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </SidebarProvider>
  )
}
