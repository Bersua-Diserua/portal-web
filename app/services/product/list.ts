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

  const groupByCategory = (data.payload.products as Array<any>).reduce((group, product) => {
    const { category } = product
    group[category.name] = group[category.name] ?? []
    group[category.name].push(product)
    return group
  }, {})

  return groupByCategory
}
