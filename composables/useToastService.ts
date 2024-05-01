import type { ToastServiceMethods } from "primevue/toastservice";

export const useToastService = () => {
    const successToast = (toast: ToastServiceMethods, title: string, description: string) => {
        toast.add({severity:'success', summary: title, detail: description, life: 3000});
    }
    const errorToast = (toast: ToastServiceMethods, title: string, description: string) => {
        toast.add({severity:'error', summary: title, detail: description, life: 3000});
    }
    return {
        successToast,
        errorToast
    };
}
