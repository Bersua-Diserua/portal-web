import { Link, useLocation } from "@remix-run/react"
import { MdDashboard, MdLogout, MdOutlinePeople, MdProductionQuantityLimits, MdRsvp } from "react-icons/md"
import React, { createContext, useContext, useEffect, useState } from "react"

import clsxm from "~/utils"

const CONFIG: SidebarButonProps[] = [
  {
    to: "/dashboard",
    children: "Dashboard",
    icon: <MdDashboard />,
    exact: true,
  },
  {
    to: "/dashboard/customer",
    children: "Customer",
    icon: <MdOutlinePeople />,
  },
  {
    to: "/dashboard/product",
    children: "Product",
    icon: <MdProductionQuantityLimits />,
  },
  {
    to: "/dashboard/rsvp",
    children: "RSVP",
    icon: <MdRsvp />,
  },
  {
    to: "/dashboard/management",
    children: "User",
    icon: <MdRsvp />,
  },
  {
    to: "/dashboard/bot",
    children: "WA Bot",
    icon: <MdRsvp />,
  },
  {
    to: "/dashboard/seat",
    children: "Seat",
    icon: <MdRsvp />,
  },
  {
    to: "/logout",
    children: "Logout",
    icon: <MdLogout />,
  },
]

type SidebarContextProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const SidebarContext = createContext<null | SidebarContextProps>(null)

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must inside SidebarContext.Provider")
  }
  return ctx
}

export function SidebarProvider(props: { children: (props: SidebarContextProps) => JSX.Element }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = useLocation().pathname

  const ctx = { isOpen, setIsOpen }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <SidebarContext.Provider value={ctx} {...props}>
      {props.children(ctx)}
    </SidebarContext.Provider>
  )
}

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <>
      <div
        className={clsxm("bg-black/20 inset-0 fixed z-50 w-screen h-screen hidden pointer-events-none", {
          "pointer-events-auto block md:hidden": isOpen,
        })}
        onClick={() => {
          setIsOpen(false)
        }}
      />
      <aside
        className={clsxm(
          "fixed rounded-r-2xl select-none py-4 px-10 md:rounded-2xl transition-transform w-sidebar h-screen md:h-[calc(100vh-9rem)] top-0 left-0 z-50 md:top-[7rem] md:left-[2rem] bg-white md:px-2 overflow-y-auto",
          {
            "-translate-x-full !left-0": !isOpen,
          }
        )}
      >
        <div className="pt-4 flex flex-col gap-4">
          {CONFIG.map((x) => {
            return <Button {...x} key={x.to} />
          })}
        </div>
      </aside>
    </>
  )
}

type SidebarButonProps = {
  to: string
  children: React.ReactNode
  icon: React.ReactNode
  exact?: boolean
}

export function Button(props: SidebarButonProps) {
  const { to, children, icon, exact } = props
  const { pathname } = useLocation()
  const isActive = exact ? pathname == to : pathname.startsWith(to)

  return (
    <Link
      className={clsxm([
        "text-black flex gap-4 items-center py-3 px-4 rounded-lg",
        isActive && "bg-accent-green",
        !isActive && "bg-none text-gray-400",
      ])}
      to={to}
    >
      <>
        {icon}
        {children}
      </>
    </Link>
  )
}
