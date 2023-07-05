import type { LoaderArgs } from "@remix-run/node"
import fs from "fs/promises"
import path from "path"
import { pdf } from "remix-utils"

function filePath() {
  return path.normalize(process.cwd() + "/public/pl-wedding.pdf")
}

export async function loader({ request }: LoaderArgs) {
  const wedding = await fs.readFile(filePath())
  return pdf(wedding)
}
