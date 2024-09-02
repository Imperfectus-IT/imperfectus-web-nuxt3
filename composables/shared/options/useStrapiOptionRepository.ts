export const useStrapiOptionRepository = () => {
  const getClosedDays = async (): Promise<string[]> => {
    const client = useStrapiClient()
    return await client<string[]>(`/options/closed-days`, { method: 'GET' })
  }
  return {
    getClosedDays,
  }
}
