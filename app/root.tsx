import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import type { LinksFunction, MetaFunction } from "@remix-run/node"

import primecore from "primereact/resources/primereact.min.css" //core css
import primeicons from "primeicons/primeicons.css" //icons
import primetheme from "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import tailwindCss from "./styles/tailwind.css"
import { ToastProvider } from "./components/ui/toast"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sérua Coffee & Creative",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindCss },
  {
    rel: "stylesheet",
    href: primetheme,
  },
  {
    rel: "stylesheet",
    href: primecore,
  },
  {
    rel: "stylesheet",
    href: primeicons,
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@200;300;400;500;600;700;800&display=swap",
  },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 dark:bg-dark-1 text-black dark:text-white">
        <ToastProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ToastProvider>
      </body>
    </html>
  )
}
