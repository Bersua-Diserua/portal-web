import { redirect } from "@remix-run/node"

export function loader() {
  return redirect("https://api.whatsapp.com/send?phone=6287766685825&text=Halo+SEVA!")
}
