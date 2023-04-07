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
  {
    title: "about us",
    link: "/about-us",
  },
  {
    title: "Story",
    link: "/serua-event",
  },
  {
    title: "Serua event",
    link: "/story",
  },
  {
    title: "product",
    link: "/product/book-menu",
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
      className={`sticky top-0 z-40 flex-none w-full mx-auto text-white py-4 transition-all duration-200 supports-backdrop-blur:backdrop-blur ${
        scrolled ? "supports-backdrop-blur:bg-[#1e293b]/95 py-0" : "supports-backdrop-blur:bg-[#1e293b] py-5"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 gap-y-2">
        <div className="flex flex-row items-center gap-x-4">
          <img className="h-12 w-12" src="https://ik.imagekit.io/bersuadiserua22/icons/Serua-putih-300x300.png" alt="" />
          <p className="text-xl font-semibold">Reservation</p>
        </div>
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
