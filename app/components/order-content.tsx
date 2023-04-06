/* eslint-disable jsx-a11y/alt-text */

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { useCallback, useRef } from "react"

import { Button } from "primereact/button"
import type { Product } from "~/services/product/list"
import { Toast } from "primereact/toast"
import { useOrder } from "~/store/use-order"

type OrderContentProps = {
  products: Product[]
}

export function OrderContent(props: OrderContentProps) {
  const { debug } = useOrder()
  const { products } = props

  const toast = useRef<Toast>(null)

  const accept = () => {
    toast.current?.show({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 })
  }

  const reject = () => {
    toast.current?.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 })
  }

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    })
  }

  const confirm2 = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    })
  }

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card flex flex-wrap gap-2 justify-content-center">
        <Button onClick={confirm1} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
        <Button onClick={confirm2} icon="pi pi-times" label="Delete"></Button>
      </div>
      <div className="flex flex-row gap-4">
        <button>Minuman</button>
        <button>Makanan</button>
        <button>Paket</button>
        <button>Lainnya</button>
      </div>
      <button onClick={debug}>Debug</button>
      {products.map((product) => (
        <ProductPreview key={product.id} {...product} />
      ))}
    </div>
  )
}

type ProductPreviewProps = Product

const formatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  style: "currency",
})

function ProductPreview(props: ProductPreviewProps) {
  const { incrementItem, detailsItem, setNote, decrementItem } = useOrder()
  const { name, desc, price, id, images } = props

  const img = images[0].url

  const { count, note } = detailsItem(id)

  const handleIncrement = useCallback(() => {
    incrementItem(id, price.amount)
  }, [id, incrementItem, price.amount])

  const handleDecrement = useCallback(() => {
    decrementItem(id, price.amount)
  }, [id, decrementItem, price.amount])

  return (
    <div className="flex border gap-2 max-h-[8rem] bg-red-500 items-center p-2">
      <div className="aspect-square w-[10%]">
        <img src={img} />
      </div>
      <div>
        <p>{name}</p>
        <p>{desc}</p>
        <p>{formatter.format(price.amount)}</p>
        <input value={note} onChange={(e) => setNote(id, e.target.value, price.amount)} />
        <div className="flex gap-2 ml-auto w-min">
          <button onClick={handleDecrement}>-</button>
          <p>{count}</p>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </div>
  )
}
