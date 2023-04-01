import type { LinksFunction, MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"

import tailwindCss from "./styles/tailwind.css"
import primetheme from "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import primecore from "primereact/resources/primereact.min.css" //core css
import primeicons from "primeicons/primeicons.css" //icons

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
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
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-dark-1 text-white">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
