import { api } from "~/services/core"
import { z } from "zod"

export const command = z.object({
  id: z.string(),
  commandCode: z.number().nullable(),
  message: z.string().nullable(),
  type: z.string().nullable(),
  image: z.string().nullable(),
})

export type CommandType = z.infer<typeof command>

const commandList = z.array(command).catch([])

type Res = TResponse<{
  list: z.infer<typeof commandList>
}>

export async function getResponseList() {
  const { data } = await api.get<Res>("/bot/command")
  return {
    list: commandList.parse(data.payload.list),
  }
}
