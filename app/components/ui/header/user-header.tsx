import { useEffect, useState } from "react"

type NavHeader = {
  title: string
  link: string
}

const SERUA_MAIN_DOMAIN = "https://bersuadiserua.com"

const NAV_HEADER: NavHeader[] = [
  {
    title: "home",
    link: "/",
  },
]

export function UserHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const scrollFunction = () => {
      if (Math.round(window.scrollY) == 0) {
        setScrolled(false)
      } else {
        setScrolled(true)
      }
    }
    window.addEventListener("scroll", scrollFunction)
    return () => window.removeEventListener("scroll", scrollFunction)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 flex-none w-full mx-auto text-white py-4 transition-all duration-200 supports-backdrop-blur:backdrop-blur rounded-b-2xl ${
        scrolled ? "supports-backdrop-blur:bg-[#0f172a]/90 py-0" : "supports-backdrop-blur:bg-[#0f172a] py-5"
      }`}
    >
      <div className="flex flex-row items-center justify-between w-full px-8 py-3 mx-auto max-w-8xl gap-y-2">
        <a href="https://bersuadiserua.com" className="flex flex-row items-center gap-x-4">
          <img className="h-10 w-10" src="https://ik.imagekit.io/bersuadiserua22/icons/Serua-putih.png" alt="" />
          <p className="text-xl font-semibold">Reservation</p>
        </a>
        <div className="flex flex-row items-center justify-center gap-5">
          {NAV_HEADER.map((val, i) => (
            <a key={i} className="capitalize" href={`${SERUA_MAIN_DOMAIN}${val.link}`}>
              {val.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
