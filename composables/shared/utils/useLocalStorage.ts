export const useLocalStorage = () => {
  const { $localStorage } = useNuxtApp()
  return {
    getItem: (key: string): any => JSON.parse($localStorage.getItem(key) || '[]'),
    setItem: (key: string, value: any): void => $localStorage.setItem(key, JSON.stringify(value)),
    removeItem: (key: string): void => $localStorage.removeItem(key),
  }
}
