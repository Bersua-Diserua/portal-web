/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["axios"],
  tailwind: true,
  future: {
    v2_meta: true,
  },
}
