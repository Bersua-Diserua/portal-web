import { Outlet } from "@remix-run/react"
import { UserHeader } from "~/components/ui/header/user-header"

export default function () {
  return (
    <>
      <UserHeader />
      <div className="w-full px-8 mx-auto max-w-8xl">
        <div className="lg:flex">
          <main className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
            <div className="flex w-full">
              <div className="flex-auto max-w-4xl min-w-0 pt-6 pb-12">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
