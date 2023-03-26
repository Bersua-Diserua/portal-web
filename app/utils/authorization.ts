import { commitSession, getSession } from "./session.server";

const ROLES = ["ADMIN", "SUPERADMIN"] as const;

type Role = typeof ROLES[number];

type Authorization = {
  accessToken: string;
  refreshToken: string;
  role: Role;
};

const KEY_AUTHORIZATION = "AUTHORIZATION";

export async function setAuthorization(
  auth: Authorization,
  headers: Headers = new Headers()
) {
  const session = await getSession();
  session.set(KEY_AUTHORIZATION, auth);

  // headers.append('Set-Cookie', await commitSession(session))
  return {
    ...auth,
    commit: () => commitSession(session),
    session,
  };
}

export async function getAuthorization(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const auth = (await session.get(KEY_AUTHORIZATION)) as Authorization;
  if (!auth || typeof auth !== "object" || !("accessToken" in auth))
    return null;
  const proxyHeader = new Headers();
  proxyHeader.set("Authorization", auth.accessToken);

  return {
    ...auth,
    session,
    proxyHeader,
  };
}
