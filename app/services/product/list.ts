import { api } from "../core"

export type Product = {
  name: string
  desc: string
  category: {
    id: string
    name: string
  } | null
  price: {
    amount: number
    unit: string
  }
  images: {
    id: string
    url: string
  }[]
  id: string
}

type ResProducts = TResponse<{
  products: Product[]
}>

export async function listProducts() {
  const { data } = await api.get<ResProducts>("/product")

  return data.payload
}
