import { useToast } from 'primevue/usetoast'
import type { ComposerTranslation } from 'vue-i18n'
import type { createOrderItemReviewPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useCreateOrderItemReviewHandler = (t: ComposerTranslation) => {
  const { executeCreateOrderItemReview } = useCreateOrderItemReview(t);
  const toast = useToast();
  const { successToast, errorToast } = useToastService();

  const createReview = async (newReview: createOrderItemReviewPayload, textData: string) => {
    try {
      await executeCreateOrderItemReview(newReview);
      successToast(toast, t(`${textData}review.successToast.title`), t(`${textData}review.successToast.description`))
    }
    catch (error) {
      console.log('Error creating review', error);
      errorToast(toast, t(`${textData}review.errorToast.title`), t(`${textData}review.errorToast.description`))
    }
  };

  return {
    createReview,
  }
};
