import { Subscription } from '../domain/Subscription'
import type { StrapiSubscription } from '~/server/contexts/backend/subscriptions/infraestructure/types/StrapiSubscription'
import { SubscriptionItem } from '~/server/contexts/backend/subscriptions-items/domain/SubscriptionItem'
import { SubscriptionShipping } from '~/server/contexts/backend/subscriptions/domain/SubscriptionShipping'
import { SubscriptionBilling } from '~/server/contexts/backend/subscriptions/domain/SubscriptionBilling'
import { SubscriptionPayment } from '~/server/contexts/backend/payments/domain/SubscriptionPayment'
import { BoxProduct } from '~/server/contexts/backend/products/domain/BoxProduct'
import { Coupon } from '~/server/contexts/backend/coupons/domain/Coupon'
import { User } from '~/server/contexts/backend/users/domain/User'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SubscriptionMapper {
  private constructor() {
  }

  static toDomain(subscription: StrapiSubscription): Subscription {
    const { subscription_meta, payment, user: strapiUser } = subscription

    const subscriptionItems = subscription.subscription_items.map((subscriptionItem) => {
      const { product, coupon_id: coupon } = subscriptionItem
      return new SubscriptionItem(
        subscriptionItem.id,
        subscriptionItem.quantity,
        subscriptionItem.amount,
        subscriptionItem.exclusions,
        subscriptionItem.image,
        new BoxProduct(product.id, product.sku, product.price, product.isActive, product.weight, product.nameEs, product.nameCa, product.descriptionEs, product.descriptionCa, product.image, product.type, product.boxType, product.isImperfectusProduct),
        subscriptionItem.weight,
        coupon ? new Coupon(coupon.id, coupon.expire, coupon.limit, coupon.discountValue, coupon.discountType, coupon.coupon, coupon.type, coupon.isActive, coupon.descriptionEs, coupon.descriptionCa, coupon.onlyFirstPurchase, coupon.maxOrdersPerUser, coupon.hasActiveSubscription) : null,
      )
    })

    const shippingInfo = new SubscriptionShipping(
      subscription_meta.shipping_firstname,
      subscription_meta.shipping_lastname,
      subscription_meta.shipping_email,
      subscription_meta.shipping_phone,
      subscription_meta.shipping_address1,
      subscription_meta.shipping_address2,
      subscription_meta.shipping_postcode,
      subscription_meta.shipping_city,
      subscription_meta.shipping_state,
      subscription_meta.shipping_country,
      subscription_meta.shipping_notes,
    )

    const billingInfo = new SubscriptionBilling(
      subscription_meta.billing_firstname,
      subscription_meta.billing_lastname,
      subscription_meta.billing_email,
      subscription_meta.billing_phone,
      subscription_meta.billing_address1,
      subscription_meta.billing_address2,
      subscription_meta.billing_postcode,
      subscription_meta.billing_city,
      subscription_meta.billing_state,
      subscription_meta.billing_country,
      subscription_meta.billing_cif,
    )
    const paymentObject = new SubscriptionPayment(payment.id, payment.user, payment.paymentMethod, payment.cardNumber, payment.cardCountry, payment.cardBrand, payment.currency, payment.expiryMonth, payment.expiryYear)

    return new Subscription(
      subscription.id,
      new User(strapiUser.id, strapiUser.username, strapiUser.email, strapiUser.confirmed, strapiUser.blocked, strapiUser.type, strapiUser.marketingInfoComm, strapiUser.whatsappInfoComm, strapiUser.role),
      subscription.status,
      subscription.frequency,
      subscription.skip,
      subscription.nextPayment,
      subscription.next_delivery_date_from_paused_at,
      subscription.cancelledAt,
      subscription.preferredDay,
      subscriptionItems,
      subscription.donations,
      subscription_meta.id,
      shippingInfo,
      billingInfo,
      subscription.preferredHour,
      paymentObject,
    )
  }
}
