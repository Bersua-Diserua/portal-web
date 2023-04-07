/* eslint-disable jsx-a11y/alt-text */
import { useCallback, useRef } from "react"
import type { Product } from "~/services/product/list"
import { Toast } from "primereact/toast"
import { useOrder } from "~/store/use-order"

export function OrderContent(props: Record<string, Record<string, Product[]>>) {
  const { products } = props

  const toast = useRef<Toast>(null)

  // const accept = () => {
  //   toast.current?.show({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 })
  // }

  // const reject = () => {
  //   toast.current?.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 })
  // }

  // const confirm1 = () => {
  //   confirmDialog({
  //     message: "Are you sure you want to proceed?",
  //     header: "Confirmation",
  //     icon: "pi pi-exclamation-triangle",
  //     accept,
  //     reject,
  //   })
  // }

  // const confirm2 = () => {
  //   confirmDialog({
  //     message: "Do you want to delete this record?",
  //     header: "Delete Confirmation",
  //     icon: "pi pi-info-circle",
  //     acceptClassName: "p-button-danger",
  //     accept,
  //     reject,
  //   })
  // }

  return (
    <div>
      <Toast ref={toast} />

      <div className="flex flex-col gap-y-8">
        {Object.keys(products).map((category) => (
          <div className="flex flex-col gap-y-4" key={category}>
            <p className="text-xl font-bold" id={category}>
              # {category}
            </p>
            {products[category].map((product) => {
              return <ProductPreview key={product.id} {...product} />
            })}
          </div>
        ))}
      </div>
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
    // <div className="flex border gap-2 max-h-[8rem] bg-red-500 items-center p-2">
    //   <div className="aspect-square w-[10%]">
    //     <img src={img} />
    //   </div>
    //   <div>
    //     <p>{name}</p>
    //     <p>{desc}</p>
    //     <p>{formatter.format(price.amount)}</p>
    //     <input value={note} onChange={(e) => setNote(id, e.target.value, price.amount)} />
    //     <div className="flex gap-2 ml-auto w-min">
    //       <button onClick={handleDecrement}>-</button>
    //       <p>{count}</p>
    //       <button onClick={handleIncrement}>+</button>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white shadow-md rounded-3xl p-4">
      <div className="flex flex-row items-center gap-x-4">
        <img src={img} alt="image_product" className="aspect-square	w-32 object-cover h-32 rounded-2xl" />
        <div className="flex flex-col py-2 w-full gap-y-4">
          <div className="flex flex-row items-center gap-x-5">
            <div className="flex flex-col gap-y-3 w-full">
              <div className="w-full text-lg text-serua font-medium ">{name}</div>
              <h2 className="flex-auto text-xs font-medium">{desc}</h2>
              <p className="w-fit mb-2 md:mb-0 bg-serua px-5 py-2 shadow-sm tracking-wider text-white rounded-full font-semibold">
                {formatter.format(price.amount)}
              </p>
            </div>
            <div
              className={`mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider text-gray-600 rounded-full border ${
                count > 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              {count}
            </div>
          </div>
          <div className="flex border-t border-gray-200"></div>
          <div className="flex flex-row gap-x-6 lg:gap-x-12 text-sm font-medium">
            <div className="flex flex-row gap-x-2 items-center w-full">
              {/* <label className="block text-sm font-medium text-gray-900 dark:text-white mb-0 pb-0">Note</label> */}
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Notes untuk pesanan ini"
                value={note}
                onChange={(e) => setNote(id, e.target.value, price.amount)}
              />
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              <button
                className="mb-2 md:mb-0 bg-red-400 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-red-800"
                type="button"
                onClick={handleDecrement}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              </button>
              <button
                className="mb-2 md:mb-0 bg-green-500 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-green-800"
                type="button"
                onClick={handleIncrement}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
