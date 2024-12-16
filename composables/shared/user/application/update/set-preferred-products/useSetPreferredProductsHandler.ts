export const useSetPreferredProductsHandler = () => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { t } = useI18n()
  const { executeSetPreferredProducts } = useSetPreferredProducts()

  const handleSetPreferredProducts = async (id: number, preferredProducts: PreferredProducts): Promise<void> => {
    try {
      await executeSetPreferredProducts(id, preferredProducts)
      successToast(toast, t('adminProfileForm.preferredProducts.title'), t('adminProfileForm.dataUpdated'))
    }
    catch (e) {
      console.error(e)
      errorToast(toast, t('adminProfileForm.preferredProducts.title'), t('adminProfileForm.dataUpdateError'))
    }
  }

  return { handleSetPreferredProducts }
}
