import { api } from "~/services/core"
import { z } from "zod"

const command = z.object({
  id: z.string(),
  commandCode: z.number().nullable(),
  message: z.string().nullable(),
  type: z.string().nullable(),
  image: z.string().nullable(),
})

const commands = z.array(command).catch([])

type Res = TResponse<{
  list: z.infer<typeof commands>
}>

export async function getResponseList() {
  const { data } = await api.get<Res>("/bot/command")
  return {
    list: commands.parse(data.payload.list),
  }
}
