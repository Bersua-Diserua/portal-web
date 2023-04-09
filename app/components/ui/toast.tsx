import { Toast } from "primereact/toast"
import type { RefObject } from "react"
import React, { useContext } from "react"
import { createContext, useRef } from "react"

type ToastContext = RefObject<Toast>

const toastContext = createContext<ToastContext | null>(null)

export function ToastProvider(props: { children: React.ReactNode }) {
  const toast = useRef<Toast>(null)

  return (
    <toastContext.Provider value={toast}>
      <Toast ref={toast} />
      {props.children}
    </toastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(toastContext)
  if (!ctx) {
    throw new Error("useToast must be use inside ToastProvider")
  }

  return ctx
}
