// import "~/global.css"

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "@remix-run/react"
import type { LinksFunction, MetaFunction } from "@remix-run/node"

import primecore from "primereact/resources/primereact.min.css" //core css
import primeicons from "primeicons/primeicons.css" //icons
import primetheme from "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import tailwindCss from "./tailwind.css"
import appCss from "./styles/app.css"
import { cssBundleHref } from "@remix-run/css-bundle"

import { ToastProvider } from "./components/ui/toast"
import { AxiosError } from "axios"

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

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 box-border dark:bg-dark-1 text-black dark:text-white">{children}</body>
    </html>
  )
}

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
      <Document>
        <div>
          <h1>Oops</h1>
          <p>Status: {error.status}</p>
          <p>{error.data.message}</p>
        </div>
      </Document>
    )
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error"
  let errorType = ""
  let url: unknown = null

  if (error instanceof AxiosError) {
    errorType = "API ERROR"
    errorMessage = error.message
    url = error.toJSON()
  } else if (error instanceof Error) {
    errorMessage = error.message
    errorType = error.name
  }

  return (
    <Document>
      <div className="bg-red-200 h-screen w-screen p-4 flex flex-col">
        <h1 className="text-4xl font-bold">Oh oh ...</h1>
        <p className="text-lg mb-4">Something went wrong.</p>
        <div className="max-w-full bg-red-400 rounded-lg max-h-full overflow-scroll shadow-inner p-2">
          <pre>{errorType}</pre>
          <pre>{errorMessage}</pre>
          {!!url && <pre className="whitespace-pre">{JSON.stringify(url, null, 2)}</pre>}
        </div>
      </div>
    </Document>
  )
}
