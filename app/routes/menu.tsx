import type { LoaderArgs } from "@remix-run/node"
import { pdf } from "remix-utils"
import fs from "fs/promises"
import path from "path"

function menuPath() {
  return path.normalize(process.cwd() + "/public/menu.pdf")
}

export async function loader({ request }: LoaderArgs) {
  const menu = await fs.readFile(menuPath())
  return pdf(menu)
}
