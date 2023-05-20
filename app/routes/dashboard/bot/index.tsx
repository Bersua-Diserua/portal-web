import { Button } from "primereact/button"
import { ClientOnly } from "remix-utils"
import { Column } from "primereact/column"
import type { CommandType } from "../../../services/bot/list"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import type { LoaderArgs } from "@remix-run/node"
import { TextField } from "~/components/ui/form"
import { command } from "../../../services/bot/list"
import { getResponseList } from "~/services/bot/list"
import { json } from "@remix-run/node"
import { useForm } from "react-hook-form"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

export async function loader({ request }: LoaderArgs) {
  const { list } = await getResponseList()
  return json({
    list,
  })
}

export async function action() {
  return json({})
}

export default function () {
  const { list } = useLoaderData<typeof loader>()
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false)
  const { handleSubmit, register, reset } = useForm<CommandType>({
    resolver: zodResolver(command),
  })

  const onClickEdit = (data: CommandType) => {
    setVisibleDialog(true)
    reset(data)
  }

  const onAddNew = () => {
    setVisibleDialog(true)
    reset({})
  }

  const onHideDialog = () => {
    setVisibleDialog(false)
  }

  const onSubmitDailog = handleSubmit((data) => {
    console.log({ ...data })
  }, console.error)

  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" autoFocus onClick={onSubmitDailog} />
    </div>
  )

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row justify-between text-center">
        <h1 className="text-lg font-bold mb-4">Bot Message</h1>
        <Button onClick={onAddNew}>Add New</Button>
      </div>
      <ClientOnly>
        {() => (
          <DataTable
            value={list}
            paginator
            rows={100}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            dataKey="id"
            showGridlines
            globalFilterFields={["commandCode"]}
            emptyMessage="No response found."
            sortField="commandCode"
            sortOrder={1}
          >
            <Column field="commandCode" header="Code" />
            <Column field="message" header="Response" filter />
            <Column field="type" header="Type" filter />
            <Column header="Action" body={(data) => <Button onClick={() => onClickEdit(data)}>Edit</Button>} />
          </DataTable>
        )}
      </ClientOnly>
      <Dialog
        header="Whatsapp Response Message"
        visible={visibleDialog}
        style={{ width: "60vw" }}
        onHide={onHideDialog}
        footer={footerContent}
      >
        <div className="flex flex-col gap-y-4">
          <input {...register("id")} className="hidden"></input>
          <input type="number" {...register("commandCode")} />
          <TextField label="Message" {...register("message")} />
        </div>
      </Dialog>
    </div>
  )
}
