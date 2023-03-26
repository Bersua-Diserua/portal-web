/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  future: {
    unstable_tailwind: true,
  },
  serverBuildPath: "api/index.js",
  serverDependenciesToBundle: ["axios"],
};
