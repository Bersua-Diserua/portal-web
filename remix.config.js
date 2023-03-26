/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*"],
  future: {
    unstable_tailwind: true,
  },
  serverDependenciesToBundle: ["axios"],
};
