import { useToast } from 'primevue/usetoast'
import type { ComposerTranslation } from 'vue-i18n'

export const useValidateCouponHandler = (t: ComposerTranslation) => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeValidateCoupon } = useValidateCoupon()
  const validateCoupon = async (validateCouponData: ValidateCouponPayload) => {
    try {
      await executeValidateCoupon(validateCouponData)
      successToast(toast, t(`subscriptions.subscription.addCoupon.successToast.add.title`), t(`subscriptions.subscription.addCoupon.successToast.add.description`))
    }
    catch (error) {
      console.error(error)
      if (error && typeof error === 'object' && 'key' in error) {
        const typedError = error as { key: string, message: string }
        errorToast(toast, t(`subscriptions.subscription.addCoupon.errorToast.title`), t(`subscriptions.subscription.addCoupon.errorToast.${typedError.key}`))
      }
      else {
        errorToast(toast, t(`subscriptions.subscription.addCoupon.errorToast.title`), t(`subscriptions.subscription.addCoupon.errorToast.description`))
      }
    }
  }

  return {
    validateCoupon,
  }
}
