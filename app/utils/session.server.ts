import { createFileSessionStorage } from "@remix-run/node";

const sessionTwo = createFileSessionStorage({
  cookie: {
    name: "session",
    secrets: ["serua"], // should be a process.env.MY_SECRET
    sameSite: "lax",
  },
  dir: "./logs-sessions",
});

export const { getSession, commitSession, destroySession } = sessionTwo;
