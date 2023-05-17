import { useSidebar } from "~/components/sidebar"
import { Spiral as Hamburger } from "hamburger-react"

export function Header() {
  const { setIsOpen, isOpen } = useSidebar()

  return (
    <header className="sticky flex justify-between top-0 z-40 flex-none w-full mx-auto border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800 md:py-4 py-1 bg-dark-1 text-white px-9">
      <div className="flex items-center justify-between w-full py-3 mx-auto max-w-8xl">
        <h1 className="md:text-2xl text-md">Sérua Coffee & Creative</h1>
      </div>
      <div className="h-2">
        <Hamburger onToggle={(toggled) => setIsOpen(toggled)} toggled={isOpen} size={20} />
      </div>
    </header>
  )
}
