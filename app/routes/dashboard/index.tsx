import { Stat } from "~/components/ui/stats"

export default function () {
  return (
    <div>
      <div className="grid grid-cols-5 gap-3">
        <Stat />
        <Stat />
        <Stat />
      </div>
    </div>
  )
}
