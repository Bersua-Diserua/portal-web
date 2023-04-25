import { api, getHeaders } from "../core"

type Product = {
  name: string
  desc: string
  price: { amount: number; unit: string }
  images: { id: string; url: string }[]
  id: string
  category: {
    id?: string
    name?: string
  }
  status?: string
}

type ListProducts = TResponse<{
  products: Product[]
}>

export async function listProducts(auth: Auth) {
  const { data } = await api.get<ListProducts>("/product/management/list", getHeaders(auth))

  return data.payload
}

type ProductDetails = TResponse<{
  product: Product
}>
export async function getProductDetails(auth: Auth, productId: string) {
  const { data } = await api.get<ProductDetails>(`/product/management/${productId}/details`, getHeaders(auth))
  return data.payload
}

export async function recordProduct(auth: Auth, payload: TObjUnknown) {
  const { data } = await api.post<TResponse>("/product/management/record", payload, getHeaders(auth))
  return data.payload
}

export async function updateProduct(auth: Auth, productId: string, payload: TObjUnknown) {
  const { data } = await api.put<TResponse>("/product/management/" + productId + "/update", payload, getHeaders(auth))
  console.log(JSON.stringify(data, null, 2))

  return data.payload
}
