import * as Sentry from "@sentry/remix"
import type { EntryContext, Headers } from "@remix-run/node"
import { PassThrough } from "stream"
import { Response } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToPipeableStream } from "react-dom/server"
import isbot from "isbot"

Sentry.init({
  dsn: "https://d2f959658b134897a76cb1551f688e97:b300fb130e154beeae2f704a22a0e07e@o4505199763390464.ingest.sentry.io/4505199764570112",
  integrations: [new Sentry.Integrations.OnUncaughtException()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
})

const ABORT_DELAY = 5000

export default function handleRequest(request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady"

  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} />, {
      [callbackName]: () => {
        const body = new PassThrough()

        responseHeaders.set("Content-Type", "text/html")

        resolve(
          new Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode,
          })
        )

        pipe(body)
      },
      onShellError: (err: unknown) => {
        reject(err)
      },
      onError: (error: unknown) => {
        didError = true

        console.error(error)
      },
    })

    setTimeout(abort, ABORT_DELAY)
  })
}
