import type { StrapiPurchase } from '~/composables/shopping-cart/infrastructure/StrapiPurchaseType.ts'

export const useStrapiPurchaseFactory = (cart: ShoppingCart): StrapiPurchase => {
  const strapiUser = useStrapiUser()
  return {
    deliveryDate: cart.deliveryDate,
    deliveryHour: cart.deliveryHour,
    user: strapiUser.value.id,
    preferredDay: cart.preferredDay,
    preferredHour: cart.preferredHour === 'full' ? null : cart.preferredHour,
    talkualLegalBasis: 'freelyGivenConsentFromContact',
    marketingInfoComm: cart.marketingInfo,
    whatsappInfoComm: cart.whatsappInfo,
    via: 'web',
    order_meta: {
      billing_firstname: cart.billingAddress.billingFirstName,
      billing_lastname: cart.billingAddress.billingLastName,
      billing_address1: cart.billingAddress.billingAddress,
      billing_address2: cart.billingAddress.billingAddress2,
      billing_city: cart.billingAddress.billingCity,
      billing_state: cart.billingAddress.billingCity,
      billing_country: cart.billingAddress.billingCountry,
      billing_postcode: cart.billingAddress.billingPostCode,
      billing_company: cart.billingAddress.billingCompany,
      billing_phone: cart.billingAddress.billingPhone,
      billing_email: cart.billingAddress.billingEmail,
      shipping_notes: cart.shippingAddress.shippingNotes,
      shipping_firstname: cart.shippingAddress.shippingFirstName,
      shipping_lastname: cart.shippingAddress.shippingLastName,
      shipping_address1: cart.shippingAddress.shippingAddress,
      shipping_address2: cart.shippingAddress.shippingAddress2,
      shipping_city: cart.shippingAddress.shippingCity,
      shipping_state: cart.shippingAddress.shippingState,
      shipping_country: cart.shippingAddress.shippingCountry,
      shipping_postcode: cart.shippingAddress.shippingPostCode,
      shipping_phone: cart.shippingAddress.shippingPhone,
      shipping_email: cart.shippingAddress.shippingEmail,
      shipping_coverage: cart.shippingAddress.shippingCoverage.shippingCoverage,
      shipping_office: cart.shippingAddress.shippingCoverage.shippingOffice,
      shipping_service: cart.shippingAddress.shippingCoverage.shippingService,
    },
    order_items: cart.items.map((item: ShoppingCartItem) => {
      return {
        product: item.product?.id,
        quantity: item.quantity,
        frequency: item.frequency,
        amount: item.product?.price,
        exclusions: item.exclusions ? item.exclusions : [],
        coupon_id: item.coupon ? item.coupon : null,
        weight: item.product?.weight,
      }
    }),
  }
}
