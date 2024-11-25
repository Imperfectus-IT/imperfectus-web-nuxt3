import type {
  Subscription,
  SubscriptionBilling,
  SubscriptionCoverage,
  SubscriptionShipping,
} from '../domain/SubscriptionTypes.ts'
import type { DonationPayload } from './DonationPayload.ts'
import type { SubscriptionTotal } from '~/components/admin/my-subscriptions/partials/SubscriptionDetails.vue'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type {
  updateSubscriptionItemPayload,
} from '~/components/admin/my-subscriptions/partials/SubscriptionModifyItem.vue'
import type { addItemPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionAddItem.vue'
import type { PauseSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionPauseModal.vue'
import type { CancelSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionCancelModal.vue'
import {
  useStrapiSubscriptionBillingFactory,
} from '~/composables/admin/subscriptions/infrastructure/factories/useStrapiSubscriptionBillingFactory.ts'
import type {
  StrapiSubscription,
} from '~/server/contexts/backend/subscriptions/infraestructure/types/StrapiSubscription.ts'
import {
  useStrapiSubscriptionItemFactory,
} from '~/composables/admin/subscriptions/infrastructure/factories/useStrapiSubscriptionItemFactory.ts'

export const useSubscriptionRepository = () => {
  const config = useRuntimeConfig()
  const { update, find, create } = useStrapi()
  const client = useStrapiClient()

  const addSubscriptionCoupon = async (subscriptionId: number, coupon: string) => {
    await client<Subscription>(`/subscriptions/${subscriptionId}/coupon`, { method: 'PUT', body: { coupon_id: coupon } })
  }
  const addSubscriptionItem = async (newSubscriptionItem: addItemPayload, subscriptionId: number) => {
    const { boxProduct, exclusions } = newSubscriptionItem
    const { price, weight, id } = boxProduct
    const body = {
      subscription: subscriptionId,
      product: id,
      exclusions,
      amount: price,
      weight,
      quantity: 1,
      status: 'active',
    }
    return await create('subscription-items', body)
  }
  const cancelDonation = async (subscriptionId: number, date: string) => {
    return await client(`/subscriptions/${subscriptionId}/removeDonationOrGift`, { method: 'POST', body: { date } })
  }
  const cancelSubscription = async (subscriptionId: number, cancelSubscriptionData: CancelSubscriptionPayload): Promise<Subscription> => {
    return await client(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'PUT',
      body: cancelSubscriptionData,
    })
  }
  const donateToONG = async (giveToOngData: DonationPayload): Promise<Subscription> => {
    const { subscriptionId } = giveToOngData
    const strapiShippingData = useStrapiSubscriptionShippingFactory(giveToOngData.newSubscriptionMeta)
    return await client<Subscription>(`/subscriptions/${subscriptionId}/giveOrder`, {
      method: 'POST',
      body: {
        ...giveToOngData,
        newSubscriptionMeta: strapiShippingData,
      },
    })
  }
  const findSubscriptionsByUser = async (): Promise<Subscription[]> => {
    const user = useStrapiUser()
    const strapiSubscriptions = await find('subscriptions', { user: user.value?.id, _sort: 'created_at:desc' })
    return strapiSubscriptions.map((subscription: StrapiSubscription) => useSubscriptionFactory(subscription))
  }
  const getSubscriptionTotal = async (subscription: Subscription): Promise<SubscriptionTotal> => {
    const strapiItems = subscription.subscriptionItems.map((item: SubscriptionItem) => useStrapiSubscriptionItemFactory(item, subscription.id))
    return await client(`/orders/total`, {
      method: 'POST',
      body: {
        items: strapiItems,
        isPlaced: true,
      },
    })
  }
  const giveOrderToFriend = async (giveOrderToFriendData: DonationPayload): Promise<void> => {
    const { subscriptionId } = giveOrderToFriendData
    const strapiShippingData = useStrapiSubscriptionShippingFactory(giveOrderToFriendData.newSubscriptionMeta)
    return await client(`/subscriptions/${subscriptionId}/giveOrder`, {
      method: 'POST',
      body: {
        ...giveOrderToFriendData,
        newSubscriptionMeta: strapiShippingData,
      },
    })
  }
  const pauseSubscription = async (pauseSubscriptionData: PauseSubscriptionPayload, subscriptionId: number): Promise<Subscription> => {
    return await client<Subscription>(`/subscriptions/${subscriptionId}/pauseSubscription`, {
      method: 'PUT', body: pauseSubscriptionData,
    })
  }
  const removeSkip = async (subscriptionId: number, skip: string[]) => {
    return await update('subscriptions', subscriptionId, { skip })
  }
  const removeSubscriptionCoupon = async (subscriptionId: number) => {
    return await client<Subscription>(`/subscriptions/${subscriptionId}/coupon`, { method: 'PUT', body: { coupon_id: null } })
  }
  const skipAnOrder = async (subscriptionId: number, skip: string[]) => {
    return update('subscriptions', subscriptionId, { skip })
  }
  const updateShippingMeta = async (metaId: number, newShippingMeta: SubscriptionShipping) => {
    const strapiShippingMeta = useStrapiSubscriptionShippingFactory(newShippingMeta)
    return await client(`/subscription-metas/${metaId}/shipping`, {
      method: 'PUT',
      body: { meta: strapiShippingMeta },
    })
  }

  const updateShippingCoverage = async (metaId: number, newShippingCoverage: SubscriptionCoverage) => {
    return await client(`subscription-metas/${metaId}/transportShipping`, {
      method: 'PUT',
      body: newShippingCoverage,
    })
  }

  const unpauseSubscription = async (subscriptionId: number): Promise<Subscription> => {
    return await client(`/subscriptions/${subscriptionId}/unpauseSubscription`, { method: 'PUT' })
  }
  const updateSubscriptionBillingMeta = async (metaId: number, newBillingMeta: SubscriptionBilling) => {
    const strapiBillingMeta = useStrapiSubscriptionBillingFactory(newBillingMeta)
    return await client(`/subscription-metas/${metaId}/billing`, {
      method: 'PUT',
      body: { meta: strapiBillingMeta },
    })
  }
  const updateSubscriptionItem = async (updateSubscriptionItemData: updateSubscriptionItemPayload) => {
    const { subscriptionItemId, newBoxProduct, exclusions } = updateSubscriptionItemData
    const { amount, weight } = newBoxProduct
    return await update('subscription-items', subscriptionItemId, {
      subscriptionItemId,
      product: newBoxProduct.id,
      exclusions,
      amount,
      weight,
    })
  }

  const updateSubscriptionPeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    await client(`/subscriptions/${subscription.id}/periodicity`, { method: 'PUT', body: { ...periodicity, shippingCoverage: 'paack' } })
  }
  const updateSubscriptionPayment = async (subscription: Subscription, paymentId: number) => await update('subscriptions', subscription.id, { payment: paymentId })

  return {
    addSubscriptionCoupon,
    addSubscriptionItem,
    cancelDonation,
    cancelSubscription,
    donateToONG,
    findSubscriptionsByUser,
    getSubscriptionTotal,
    giveOrderToFriend,
    pauseSubscription,
    removeSkip,
    removeSubscriptionCoupon,
    skipAnOrder,
    unpauseSubscription,
    updateSubscriptionPeriodicity,
    updateSubscriptionPayment,
    updateSubscriptionBillingMeta,
    updateShippingCoverage,
    updateSubscriptionItem,
    updateShippingMeta,
  }
}
