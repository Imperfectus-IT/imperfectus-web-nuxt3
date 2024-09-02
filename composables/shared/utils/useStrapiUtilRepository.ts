export const useStrapiUtilRepository = () => {
  const getDate = async (): Promise<string> => {
    const client = useStrapiClient()
    return await client<string>('/utils/date', { method: 'GET' })
  }
  return {
    getDate,
  }
}
