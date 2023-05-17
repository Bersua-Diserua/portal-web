import { useSidebar } from "~/components/sidebar"
import { Spiral as Hamburger } from "hamburger-react"
import { Menu } from "primereact/menu"

export function Header() {
  const { setIsOpen, isOpen } = useSidebar()

  return (
    <header className="sticky flex justify-between top-0 z-40 flex-none w-full mx-auto border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800 py-4 bg-dark-1 text-white px-9">
      <div className="flex items-center justify-between w-full py-3 mx-auto max-w-8xl">
        <h1 className="text-2xl">Sérua Coffee & Creative</h1>
      </div>
      <Hamburger onToggle={(toggled) => setIsOpen(toggled)} toggled={isOpen} />
    </header>
  )
}
