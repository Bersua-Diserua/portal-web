import { api, getHeaders } from "../core"

type Category = {
  name: string
  id: string
}

type ResCategories = TResponse<{ categories: Category[] }>

export async function listCategories() {
  const { data } = await api.get<ResCategories>("/product/category")
  return data.payload
}

export async function recordCategory(auth: Auth, name: string) {
  const { data } = await api.post<TResponse>("/product/category", { name }, getHeaders(auth))

  return data.payload
}

export async function updateCategory(auth: Auth, categoryId: string, name: string) {
  const { data } = await api.put<TResponse>("/product/category/" + categoryId, { name }, getHeaders(auth))

  return data.payload
}

export async function removeCategory(auth: Auth, categoryId: string) {
  const { data } = await api.delete<TResponse>("/product/category/" + categoryId, getHeaders(auth))
  return data.payload
}
