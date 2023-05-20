// import "~/global.css"

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "@remix-run/react"
import type { LinksFunction, MetaFunction } from "@remix-run/node"

import { ToastProvider } from "./components/ui/toast"
import appCss from "./styles/app.css"
import { cssBundleHref } from "@remix-run/css-bundle"
import primecore from "primereact/resources/primereact.min.css" //core css
import primeicons from "primeicons/primeicons.css" //icons
import primetheme from "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import tailwindCss from "./tailwind.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sérua Coffee & Creative",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appCss },
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
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 box-border dark:bg-dark-1 text-black dark:text-white">
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

export function ErrorBoundary() {
  const error = useRouteError()

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    )
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error"

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  )
}
