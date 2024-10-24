import type { StrapiPurchase } from '~/composables/shopping-cart/infrastructure/StrapiPurchaseType.ts'

export const useStrapiPurchaseFactory = (cart: ShoppingCart): StrapiPurchase => {
  const strapiUser = useStrapiUser()
  console.log('cart', cart)
  return {
    deliveryDate: cart.deliveryDate,
    deliveryHour: cart.deliveryHour,
    user: strapiUser.value.id,
    preferredDay: cart.preferredDay,
    preferredHour: cart.preferredHour,
    talkualLegalBasis: 'freelyGivenConsentFromContact',
    marketingInfoComm: cart.marketingInfo,
    whatsappInfoComm: cart.whatsappInfo,
    notes: cart.notes,
    via: 'web',
    order_meta: {
      billing_firstname: cart.billingAddress.firstname,
      billing_lastname: cart.billingAddress.lastname,
      billing_address1: cart.billingAddress.address1,
      billing_address2: cart.billingAddress.address2,
      billing_city: cart.billingAddress.city,
      billing_state: cart.billingAddress.state,
      billing_country: cart.billingAddress.country,
      billing_postcode: cart.billingAddress.postalCode,
      billing_company: cart.billingAddress.company,
      billing_phone: cart.billingAddress.phone,
      billing_email: cart.billingAddress.email,
      shipping_notes: cart.shippingAddress.notes,
      shipping_firstname: cart.shippingAddress.firstname,
      shipping_lastname: cart.shippingAddress.lastname,
      shipping_address1: cart.shippingAddress.address1,
      shipping_address2: cart.shippingAddress.address2,
      shipping_city: cart.shippingAddress.city,
      shipping_state: cart.shippingAddress.state,
      shipping_country: cart.shippingAddress.country,
      shipping_postcode: cart.shippingAddress.postalCode,
      shipping_company: cart.shippingAddress.company,
      shipping_phone: cart.shippingAddress.phone,
    },
    order_items: cart.items.map((item: ShoppingCartItem) => {
      console.log('item', item)
      return {
        product: item.product.id,
        quantity: item.quantity,
        frequency: item.frequency,
        amount: item.product.price,
        exclusions: item.exclusions ? item.exclusions.map((exclusion: Exclusion) => exclusion.id) : [],
        coupon: item.coupon ? item.coupon.id : null,
        weight: item.product.weight,
        tax_id: item.product.tax_id,
      }
    }),
  }
}
