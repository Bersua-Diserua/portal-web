import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { Controller, useForm } from "react-hook-form"
import { getProductDetails, updateProduct } from "~/services/product/management"
import { parseStringify, useSubmitStringify } from "~/utils/use-submit–stringify"

import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { TextField } from "~/components/ui/form"
import clsxm from "~/utils"
import { convertToBase64 } from "~/utils/convert"
import { getRequiredAuth } from "~/utils/authorization"
import { json } from "@remix-run/node"
import { listCategories } from "~/services/product/category"
import { redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export async function loader({ request, params }: LoaderArgs) {
  const { productId } = params
  if (!productId || typeof productId !== "string") throw redirect("/dashboard/product")

  const auth = await getRequiredAuth(request)
  const { product } = await getProductDetails(auth, productId)
  const { categories } = await listCategories()

  return json({
    product,
    categories,
  })
}

const validator = z.object({
  name: z.string().min(1),
  price: z.preprocess(Number, z.number()),
  desc: z.string().min(1),
  category: z.object({
    name: z.string(),
    id: z.string(),
  }),
  image: z.string().optional().catch(undefined),
  status: z.string().min(1),
})

export async function action({ request, params }: ActionArgs) {
  const { productId } = params
  if (!productId || typeof productId !== "string") throw redirect("/dashboard/product")
  const auth = await getRequiredAuth(request)

  const { name, desc, price, image, category, status } = await parseStringify<z.infer<typeof validator>>(request)
  await updateProduct(auth, productId, {
    name,
    desc,
    price: {
      amount: price,
      unit: "Porsi",
    },
    images: image ? [image] : undefined,
    category: category?.id || undefined,
    status,
  })
  return redirect("/dashboard/product")
}

export default function () {
  const { product, categories } = useLoaderData<typeof loader>()
  const submit = useSubmitStringify()
  const { register, control, handleSubmit, formState, setValue } = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      name: product.name,
      price: product.price.amount,
      desc: product.desc,
      category: categories.find((x) => x.id == product.category.id),
    },
  })

  const handleOnSubmit = handleSubmit((data) => {
    submit({ ...data }, { method: "post" })
  }, console.error)

  const { errors } = formState

  return (
    <div>
      <h1>Edit product: {product.id}</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="file"
          defaultValue=""
          onChange={(e) => {
            const { files } = e.target
            if (!files) return
            const file = files[0]
            if (!file) return
            convertToBase64(file).then((x) => setValue("image", x as string))
          }}
        />
        <p>{String(errors.image?.message)}</p>
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <Dropdown
              {...field}
              optionLabel="name"
              placeholder="Select a Category"
              options={categories}
              onChange={(e) => field.onChange(e.value)}
              className={clsxm({ "p-invalid": fieldState.error })}
            />
          )}
        />
        <p>{String(errors.category?.message)}</p>
        <TextField label="Name" {...register("name")} error={errors.name?.message} />
        <TextField label="Price" {...register("price")} error={errors.price?.message} type="number" />
        <TextField label="Description" {...register("desc")} error={errors.desc?.message} />
        <TextField label="Status" {...register("status")} error={errors.status?.message} />
        <Button>Submit</Button>
      </form>
    </div>
  )
}
