import { create } from "zustand"

type Item = {
  name: string
  note: string
  count: number
  price: number
}

export type ProductsSubmission = {
  amount: number
  products: Array<{
    productId: string
    note: string
    amount: number
  }>
}

interface OrderState {
  products: Map<string, Item>
  incrementItem: (idProduct: string, name: string, price: number) => void
  decrementItem: (idProduct: string) => void
  detailsItem: (id: string) => Item
  setNote: (id: string, note: string, name: string, price: number) => void
  debug: () => any
  calc: () => number
  toJson: () => ProductsSubmission
}

const useOrder = create<OrderState>((set, get) => ({
  products: new Map(),
  incrementItem: (id, name, price) => {
    const { products } = get()
    const exist = products.has(id)

    if (exist) {
      const item = products.get(id)!
      item.count++
      item.name = name
    } else {
      products.set(id, {
        name,
        count: 1,
        note: "",
        price,
      })
    }

    set({ products })
    console.log({ products })
  },
  decrementItem(id) {
    const { products } = get()
    const exist = products.has(id)

    if (exist) {
      const item = products.get(id)!
      if (item.count > 0) {
        item.count--
      }
    }

    set({ products })
  },
  detailsItem(id) {
    const { products } = get()
    const item = products.get(id)
    return {
      count: item?.count || 0,
      note: item?.note || "",
      price: item?.price || 0,
      name: item?.name || "",
    }
  },
  setNote(id, note, name, price) {
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
        name,
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
    return 0
  },
  toJson() {
    const { products } = get()
    let amount = 0
    const summary = Array.from(products).reduce<ProductsSubmission["products"]>((prev, curr) => {
      const [key, val] = curr
      amount += val.count * val.price
      return [
        ...prev,
        {
          productId: key,
          amount: val.count,
          note: val.note,
        },
      ]
    }, [])

    console.log({
      amount,
      products: summary,
    })

    return {
      products: summary,
      amount,
    }
  },
}))

export { useOrder }
