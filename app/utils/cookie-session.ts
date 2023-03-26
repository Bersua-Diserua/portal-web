import { createCookie } from "@remix-run/node"; // or cloudflare/deno

const cookieSession = createCookie("session", {
  expires: new Date(Date.now() + 60_000),
  httpOnly: true,
  maxAge: 60,
  path: "/",
  sameSite: "lax",
  secrets: ["s3cret1"],
  secure: true,
});

export { cookieSession };
