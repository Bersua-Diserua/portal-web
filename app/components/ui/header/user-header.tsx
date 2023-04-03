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
  return (
    <header className="sticky top-0 z-40 flex-none w-full mx-auto border-b border-gray-200 bg-gray-900 text-white py-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 gap-y-2">
        <h1 className="text-2xl">logo soon</h1>
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
