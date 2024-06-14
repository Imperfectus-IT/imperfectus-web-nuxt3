export const useLocationValidator = () => {
  const MAX_POSTAL_CODE_LENGTH = 5
  const isPostalCodeLengthValid = (postalCode: string | null | undefined): boolean => postalCode !== null && postalCode?.length === MAX_POSTAL_CODE_LENGTH
  const isCoverageValid = (coverage: string | null | undefined): boolean => coverage !== null && coverage !== undefined

  return {
    MAX_POSTAL_CODE_LENGTH,
    isPostalCodeLengthValid,
    isCoverageValid,
  }
}
