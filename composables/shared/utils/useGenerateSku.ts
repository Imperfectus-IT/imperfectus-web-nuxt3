export const useGenerateSku = () => {
  const generateSku = (type: string, size: string, frequency?: string) => {
    if (frequency && frequency !== 'once') {
      const frequencyNumber = frequency === 'weekly' ? 1 : 2
      return `${size}R${frequencyNumber}${type === 'fruits' ? 'FR' : type === 'vegetables' ? 'VG' : type === 'orange' ? 'Orange' : ''}`
    }
    else {
      return `${size}${type === 'fruits' ? 'FR' : type === 'vegetables' ? 'VG' : type === 'orange' ? 'Orange' : ''}`
    }

    if (type === 'orange') {
      return `${size}${type === 'fruits' ? 'FR' : type === 'vegetables' ? 'VG' : type === 'orange' ? 'Orange' : ''}`
    }
  }
  return { generateSku }
}
