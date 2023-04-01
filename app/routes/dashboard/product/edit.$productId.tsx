import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TextField } from "~/components/ui/form"
import { z } from "zod"
import { Button } from "primereact/button"
import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useSubmitStringify, parseStringify } from "~/utils/use-submit–stringify"
import { convertToBase64 } from "~/utils/convert"
import { getRequiredAuth } from "~/utils/authorization"
import { getProductDetails, updateProduct } from "~/services/product/management"
import { useLoaderData } from "@remix-run/react"

export async function loader({ request, params }: LoaderArgs) {
  const { productId } = params
  if (!productId || typeof productId !== "string") throw redirect("/dashboard/product")

  const auth = await getRequiredAuth(request)
  const { product } = await getProductDetails(auth, productId)
  return json({
    product,
  })
}

const validator = z.object({
  name: z.string().min(1),
  price: z.preprocess(Number, z.number()),
  desc: z.string().min(1),
  image: z.string().optional().catch(undefined),
})

export async function action({ request, params }: ActionArgs) {
  const { productId } = params
  if (!productId || typeof productId !== "string") throw redirect("/dashboard/product")
  const auth = await getRequiredAuth(request)

  const { name, desc, price, image } = await parseStringify<z.infer<typeof validator>>(request)
  await updateProduct(auth, productId, {
    name,
    desc,
    price: {
      amount: price,
      unit: "Porsi",
    },
    images: image ? [image] : undefined,
  })
  return redirect("/dashboard/product")
}

export default function () {
  const { product } = useLoaderData<typeof loader>()
  const submit = useSubmitStringify()
  const { register, handleSubmit, formState, setValue } = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      image: product.images[0]?.url,
      name: product.name,
      price: product.price.amount,
      desc: product.desc,
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
        <TextField label="Name" {...register("name")} error={errors.name?.message} />
        <TextField label="Price" {...register("price")} error={errors.price?.message} type="number" />
        <TextField label="Description" {...register("desc")} error={errors.desc?.message} />
        <Button>Submit</Button>
      </form>
    </div>
  )
}
