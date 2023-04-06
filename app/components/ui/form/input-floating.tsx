import { type UseControllerProps, useController } from "react-hook-form"

import { InputText } from "primereact/inputtext"
import { classNames } from "primereact/utils"

type InputWithControllerProps = UseControllerProps & {
  label: string
  classname?: string
  containerClassname?: string
  disabled?: boolean
  placeholder?: string
  type?: JSX.IntrinsicElements["input"]["type"]
  onChange?: JSX.IntrinsicElements["input"]["onChange"]
}

export function InputFloating({
  defaultValue = "",
  label,
  classname,
  containerClassname,
  disabled = false,
  placeholder = "",
  type = "text",
  onChange = undefined,
  ...props
}: InputWithControllerProps) {
  const { field, fieldState } = useController({ ...props, defaultValue })
  return (
    <>
      <label htmlFor={field.name} className={classNames({ "p-error": fieldState.error?.message })}></label>
      <span className="p-float-label">
        <InputText
          id={field.name}
          value={field.value}
          className={classNames({ "p-invalid": fieldState.error })}
          onChange={(e) => field.onChange(e.target.value)}
        />
        <label htmlFor={field.name}>{field.name}</label>
      </span>
      <small className="p-error">{fieldState.error?.message}</small>
    </>
  )
}
