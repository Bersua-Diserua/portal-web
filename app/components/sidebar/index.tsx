import { Link, useLocation } from "@remix-run/react"
import { MdDashboard, MdLogout, MdOutlinePeople, MdProductionQuantityLimits, MdRsvp } from "react-icons/md"
import React, { createContext, useContext, useState } from "react"

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

export function SidebarProvider(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
      {...props}
    />
  )
}

export function Sidebar() {
  return (
    <aside
      aria-label="Default sidebar example"
      className="fixed hidden inset-0 top-0 z-20 flex-none min-h-screen w-72 lg:static lg:h-auto lg:overflow-y-visible lg:w-48 lg:block border-r border-gray-300"
    >
      <div className="pt-4 flex flex-col gap-4 pr-6">
        {CONFIG.map((x) => {
          return <Button {...x} key={x.to} />
        })}
      </div>
    </aside>
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
        "text-black flex gap-4 items-center px-4 py-3 rounded-lg",
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
