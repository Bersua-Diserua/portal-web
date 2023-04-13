import { z } from "zod"
import { api, getHeaders } from "~/services/core"

const customer = z.object({
  id: z.string(),
  name: z.string().nullable(),
  phoneNumber: z.string().nullable(),
})

const customers = z.array(customer)

type Res = TResponse<{
  customers: z.infer<typeof customers>
}>

export async function getListCustomers(auth: Auth) {
  const { data } = await api.get<Res>("/customer/management", getHeaders(auth))

  return {
    customers: customers.parse(data.payload.customers),
  }
}
