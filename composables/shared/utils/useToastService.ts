import type { ToastServiceMethods } from 'primevue/toastservice'

export const useToastService = () => {
  const successToast = (toast: ToastServiceMethods, title: string, description: string, life: number = 3500) => {
    toast.add({ severity: 'success', summary: title, detail: description, life })
  }
  const errorToast = (toast: ToastServiceMethods, title: string, description: string, life: number = 3500) => {
    toast.add({ severity: 'error', summary: title, detail: description, life })
  }
  return {
    successToast,
    errorToast,
  }
}
