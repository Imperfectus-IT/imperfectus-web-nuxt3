import type { Subscription } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'

export const useSubscriptionFactory = (subscription: any): Subscription => {
  return {
    id: subscription.id,
    status: subscription.status,
    frequency: subscription.frequency,
    nextPayment: subscription.nextPayment,
    nextDeliveryDateFromPaused: subscription.next_delivery_date_from_paused_at,
    preferredDay: subscription.preferredDay,
    cancelledAt: subscription.cancelledAt,
    donations: subscription.given?.map((donation: any) => donation.order_date),
    preferredHour: subscription.preferredHour,
    subscriptionMeta: subscription.subscription_meta.id,
    shippingInfo: {
      shippingFirstName: subscription.subscription_meta.shipping_firstname,
      shippingLastName: subscription.subscription_meta.shipping_lastname,
      shippingEmail: subscription.subscription_meta.shipping_email,
      shippingPhone: subscription.subscription_meta.shipping_phone,
      shippingAddress: subscription.subscription_meta.shipping_address1,
      shippingAddress2: subscription.subscription_meta.shipping_address2,
      shippingPostCode: subscription.subscription_meta.shipping_postcode,
      shippingCity: subscription.subscription_meta.shipping_city,
      shippingState: subscription.subscription_meta.shipping_state,
      shippingCountry: subscription.subscription_meta.shipping_country,
      shippingNotes: subscription.subscription_meta.shipping_notes,
    },
    shippingCoverage: {
      shippingCoverage: subscription.subscription_meta.shipping_coverage,
      shippingService: subscription.subscription_meta.shipping_service,
      shippingOffice: subscription.subscription_meta.shipping_office,
    },
    billingInfo: {
      billingFirstName: subscription.subscription_meta.billing_firstname,
      billingLastName: subscription.subscription_meta.billing_lastname,
      billingEmail: subscription.subscription_meta.billing_email,
      billingPhone: subscription.subscription_meta.billing_phone,
      billingAddress: subscription.subscription_meta.billing_address1,
      billingAddress2: subscription.subscription_meta.billing_address2,
      billingPostCode: subscription.subscription_meta.billing_postcode,
      billingCity: subscription.subscription_meta.billing_city,
      billingState: subscription.subscription_meta.billing_state,
      billingCountry: subscription.subscription_meta.billing_country,
      billingCif: subscription.subscription_meta.billing_cif,
    },

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
          return {
            id: exclusion.id,
            nameEs: exclusion.name_es,
            nameCa: exclusion.name_ca,
            product: exclusion.product,
          }
        }),
        coupon: item.coupon_id
          ? {
              coupon: item.coupon_id.coupon,
              discountType: item.coupon_id.discountType,
              discountValue: item.coupon_id.discountValue,
              id: item.coupon_id.id,
              isActive: item.coupon_id.isActive,
              type: item.coupon_id.type,
            }
          : null,
      }
    }),
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
