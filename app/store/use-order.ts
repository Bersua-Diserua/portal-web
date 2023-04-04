import { create } from "zustand"

type Item = {
  note: string
  count: number
  price: number
}

interface OrderState {
  products: Map<string, Item>
  incrementItem: (idProduct: string, price: number) => void
  decrementItem: (idProduct: string) => void
  detailsItem: (id: string) => Item
  setNote: (id: string, note: string, price: number) => void
  debug: () => any
  calc: () => number
}

const useOrder = create<OrderState>((set, get) => ({
  products: new Map(),
  incrementItem: (id, price) => {
    const { products } = get()
    const exist = products.has(id)

    if (exist) {
      const item = products.get(id)!
      item.count++
    } else {
      products.set(id, {
        count: 1,
        note: "",
        price,
      })
    }

    set({ products })
  },
  decrementItem(productId) {
    const { products } = get()
    const exist = products.has(productId)
  },
  detailsItem(id) {
    const { products } = get()
    const item = products.get(id)
    return {
      count: item?.count || 0,
      note: item?.note || "",
      price: item?.price || 0,
    }
  },
  setNote(id, note, price) {
    const { products } = get()
    const exist = products.has(id)

    if (exist) {
      const item = products.get(id)!
      item.note = note
    } else {
      products.set(id, {
        count: 0,
        note,
        price,
      })
    }

    set({ products })
  },
  debug() {
    const { products } = get()
    const count = Array.from(products).reduce<number>((prev, curr) => {
      const [, val] = curr
      return (prev += val.count * val.price)
    }, 0)

    console.log({ count })
  },
  calc() {
    const { products } = get()
    return 0
  },
}))

export { useOrder }
