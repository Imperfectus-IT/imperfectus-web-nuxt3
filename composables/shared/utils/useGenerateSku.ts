export const useGenerateSku = () => {
  const generateSku = (type: string, size: string, frequency: string) => {
    if (frequency) {
      const frequencyNumber = frequency === 'weekly' ? 1 : 2
      return `${size}R${frequencyNumber}${type === 'mixed' ? '' : type === 'fruits' ? 'FR' : 'VG'}`
    }
    else {
      return `${size}${type === 'mixed' ? '' : type === 'fruits' ? 'FR' : 'VG'}`
    }
  }
  return { generateSku }
}
