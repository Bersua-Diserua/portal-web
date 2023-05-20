import type { OverviewSchema } from "~/services/rsvp/management/overview"

export function Stat() {
  return (
    <div className="drop-shadow-md bg-white p-4 rounded-md">
      <div className="flex justify-between mb-3">
        <div>
          <span className="block text-500 font-medium mb-3">Hari ini</span>
          <div className="text-900 font-medium text-xl">152</div>
        </div>
        {/* <div className="flex items-center justify-center bg-blue-100 rounded-lg" style={{ width: "2.5rem", height: "2.5rem" }}>
          <i className="pi pi-shopping-cart text-blue-500 text-xl" />
        </div> */}
      </div>
    </div>
  )
}

type RsvpStatProps = {
  title: string
  overview: OverviewSchema[]
}

export function RsvpStat(props: RsvpStatProps) {
  const { title, overview } = props
  return (
    <div className="drop-shadow-md bg-white p-4 rounded-md hover:bg-red-200">
      <div className="flex justify-between mb-3">
        <div>
          <span className="block text-500 font-medium mb-3">{title}</span>
          <div className="text-900 font-medium text-xl">{overview.reduce((prev, curr) => prev + curr.count, 0)}</div>
        </div>
        {/* <div className="flex items-center justify-center bg-blue-100 rounded-lg" style={{ width: "2.5rem", height: "2.5rem" }}>
          <i className="pi pi-shopping-cart text-blue-500 text-xl" />
        </div> */}
      </div>
      {overview.map((val) => {
        if (val.status == "TICKET") return null
        return (
          <p key={val.status} className="flex justify-between">
            <span className="capitalize">{(val.status == "SUBMISSION.APPROVE" ? "Pembayaran" : val.status).toLowerCase()}</span>
            <span>{val.count}</span>
          </p>
        )
      })}
    </div>
  )
}
