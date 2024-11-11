export default defineNuxtPlugin(() => {
  return {
    provide: {
      localStorage: {
        getItem(item: string) {
          return import.meta.client ? localStorage.getItem(item) : undefined
        },

        setItem(item: string, value: any): void {
          if (import.meta.client) {
            localStorage.setItem(item, value)
          }
        },
        removeItem(item: string): void {
          if (import.meta.client) {
            localStorage.removeItem(item)
          }
        },
      },
    },
  }
})
