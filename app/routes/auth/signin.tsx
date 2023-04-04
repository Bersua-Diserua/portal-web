import { parseStringify, useSubmitStringify } from "~/utils/use-submit–stringify"

import type { ActionArgs } from "@remix-run/node"
import { TextField } from "~/components/ui/form"
import { json } from "@remix-run/node"
import { setAuthorization } from "~/utils/authorization"
import { signin } from "~/services/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

type LoginSchema = z.infer<typeof loginSchema>

export async function action({ request }: ActionArgs) {
  const { token } = await signin(await parseStringify<LoginSchema>(request))

  const { commit } = await setAuthorization({
    accessToken: token,
    refreshToken: token,
    role: "ADMIN",
  })

  return json(null, {
    headers: {
      "Set-Cookie": await commit(),
    },
  })
}

export default function () {
  const submit = useSubmitStringify()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const handleOnSubmit = handleSubmit((data) => {
    submit(data, { method: "post" })
  }, console.error)

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className="bg-dark-2 m-auto rounded-2xl p-8 flex flex-col gap-4 text-white">
        <h1 className="h1">Login</h1>
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <TextField {...register("email")} error={errors.email?.message} placeholder="Email" />
          <TextField {...register("password")} placeholder="Password" type="password" error={errors.password?.message} />

          <button className="btn btn-primary">Masuk</button>
        </form>
      </div>
    </div>
  )
}
