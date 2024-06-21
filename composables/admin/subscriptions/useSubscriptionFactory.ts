import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useSubscriptionFactory = (subscription: any): Subscription => {
  console.log(subscription)
  return {
    id: subscription.id,
    status: subscription.status,
    frequency: subscription.frequency,
    nextPayment: subscription.nextPayment,
    preferredDay: subscription.preferredDay,
    cancelledAt: subscription.cancelledAt,
    donations: subscription.given?.map((donation: any) => donation.order_date),
    preferredHour: subscription.preferredHour,
    coupon: subscription.coupon
      ? {
          coupon: subscription.coupon.coupon,
          discountType: subscription.coupon.discountType,
          discountValue: subscription.coupon.discountValue,
          id: subscription.coupon.id,
          isActive: subscription.coupon.isActive,
          type: subscription.coupon.type,
        }
      : null,
    subscriptionItems: subscription.subscription_items.map((item: any) => {
      return {
        product: {
          id: item.product.id,
          sku: item.product.SKU,
          type: item.product.type,
          itemType: item.product.itemType,
          boxType: item.product.boxType,
          isActive: item.product.isActive,
        },
        subscription: item.subscription,
        quantity: item.quantity,
        id: item.id,
        amount: item.amount,
        sku: item.product.SKU,
        image: `images/boxes/Caixa-${getBoxImage(item?.product.SKU)}.webp`,
        exclusions: item.exclusions.map((exclusion: any) => {
          return exclusion.name_es
        }),
      }
    }),
    subscriptionMeta: subscription.subscription_meta,
    skip: subscription.skip ? [...subscription.skip] : [],
    payment: {
      id: subscription.payment.id,
      user: subscription.payment.user,
      paymentMethod: subscription.payment.paymentMethod,
      cardNumber: subscription.payment.cardNumber,
      cardCountry: subscription.payment.cardCountry,
      cardBrand: subscription.payment.cardBrand,
      currency: subscription.payment.currency,
      expiryMonth: subscription.payment.expiryMonth,
      expiryYear: subscription.payment.expiryYear,
      created_at: subscription.payment.created_at,
      updated_at: subscription.payment.updated_at,
      notification_hash: subscription.payment.notification_hash,
    },
  }
}

const getBoxImage = (sku: string) => {
  return sku?.includes('IM') ? 'M' : sku.includes('XL') ? 'XL' : 'S'
}
