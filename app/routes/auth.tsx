import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getAuthorization } from "~/utils/authorization";

export async function loader({ request }: LoaderArgs) {
  const auth = await getAuthorization(request);

  if (auth) {
    throw redirect("/dashboard");
  }

  return null;
}

export default Outlet;
