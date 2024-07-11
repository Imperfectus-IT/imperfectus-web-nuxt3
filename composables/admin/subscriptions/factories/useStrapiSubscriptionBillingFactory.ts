import type { SubscriptionBilling } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useStrapiSubscriptionBillingFactory = (billing: SubscriptionBilling) => {
  return {
    billing_firstname: billing.billingFirstName,
    billing_lastname: billing.billingLastName,
    billing_email: billing.billingEmail,
    billing_phone: billing.billingPhone,
    billing_address1: billing.billingAddress,
    billing_address2: billing.billingAddress2,
    billing_postcode: billing.billingPostCode,
    billing_city: billing.billingCity,
    billing_state: billing.billingState,
    billing_country: billing.billingCountry,
    billing_cif: billing.billingCif,
  }
}
