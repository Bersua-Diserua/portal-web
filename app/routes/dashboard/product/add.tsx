import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TextField } from "~/components/ui/form"
import { z } from "zod"
import { Button } from "primereact/button"
import type { ActionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { useSubmitStringify, parseStringify } from "~/utils/use-submit–stringify"
import { convertToBase64 } from "~/utils/convert"
import { getRequiredAuth } from "~/utils/authorization"
import { recordProduct } from "~/services/product/management"
import { useNavigation } from "@remix-run/react"

const validator = z.object({
  name: z.string().min(1),
  price: z.preprocess(Number, z.number()),
  desc: z.string().min(1),
  image: z.string().optional().catch(undefined),
})

export async function action({ request }: ActionArgs) {
  const auth = await getRequiredAuth(request)
  const { name, price, desc, image } = await parseStringify<z.infer<typeof validator>>(request)
  await recordProduct(auth, {
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
  const submit = useSubmitStringify()
  const navigation = useNavigation()
  const { register, handleSubmit, formState, setValue } = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  })

  const handleOnSubmit = handleSubmit((data) => {
    submit(data, {
      method: "post",
    })
  }, console.error)

  const { errors } = formState

  return (
    <div>
      <h1>Add new product</h1>
      <fieldset disabled={navigation.state === "submitting"}>
        <form onSubmit={handleOnSubmit}>
          <input
            type="file"
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
          <TextField label="Description" {...register("desc")} />
          <Button>Submit</Button>
        </form>
      </fieldset>
    </div>
  )
}
