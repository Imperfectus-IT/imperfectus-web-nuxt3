import type { SubscriptionShipping } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useStrapiSubscriptionShippingFactory = (shipping: SubscriptionShipping) => {
  return {
    shipping_firstname: shipping.shippingFirstName,
    shipping_lastname: shipping.shippingLastName,
    shipping_email: shipping.shippingEmail,
    shipping_phone: shipping.shippingPhone,
    shipping_address1: shipping.shippingAddress,
    shipping_address2: shipping.shippingAddress2,
    shipping_postcode: shipping.shippingPostCode,
    shipping_city: shipping.shippingCity,
    shipping_state: shipping.shippingState,
    shipping_country: shipping.shippingCountry,
  }
}
