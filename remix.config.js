/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["axios", "@sentry/remix"],
  serverModuleFormat: "cjs",
  tailwind: true,
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  },
}
