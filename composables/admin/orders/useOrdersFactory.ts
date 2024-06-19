import { useOrderReviewValidator } from '~/composables/admin/orders/useOrderReviewValidator.ts'
import type { Order } from '~/composables/admin/orders/types/OrderType.ts'

const { isValidForReview } = useOrderReviewValidator()

export const useOrdersFactory = (order: any, t: any): Order => {
  return {
    id: order.id,
    order_id: order.order_id,
    status: order.status,
    isValidForReview: isValidForReview(order),
    deliveryDate: order.deliveryDate,
    orderItems: order.order_items.map((order_item: any) => {
      return {
        id: order_item.id,
        amount: order_item.final_amount ? order_item.final_amount : order_item.amount,
        sku: order_item.product.SKU,
        image: `images/boxes/Caixa-${getBoxImage(order_item.product.SKU)}.webp`,
        exclusions: order_item.exclusions.map((exclusion: any) => {
          return exclusion.name_es
        }),
        review: order_item.order_item_review === null
          ? null
          : {
              id: order_item.order_item_review?.id,
              ratings: {
                productQuality: order_item.order_item_review?.ratings.productQuality,
                deliveryService: order_item.order_item_review?.ratings.deliveryService,
                overallExperience: order_item.order_item_review?.ratings.overallExperience,
              },
            },
      }
    }),
    billing: {
      state: unpaidOrderStates.includes(order.status) ? t('orders.order.billing.order_pending') : t('orders.order.billing.order_paid'),
      amount: order.order_payment.totalAmount,
      shippingCosts: shippingSuplementsAmount(order.order_shipping_supplements) === 0 ? t('orders.order.billing.free_shipping') : shippingSuplementsAmount(order.order_shipping_supplements) + ' €',
      total: order.order_payment.totalAmount + shippingSuplementsAmount(order.order_shipping_supplements),
    },
    deliveryInfo: {
      deliveryDate: order.deliveryDate,
      coverage: order.order_meta.shipping_coverage.toUpperCase(),
      deliveryTime: order.deliveryHour,
      tracking: order.order_items.map((order_item: any) => {
        return {
          trackingID: order_item.trackingId,
          trackingLink: order_item.trackingUrl,
          boxType: order_item.product.SKU,
        }
      }),
    },
    shippingInfo: {
      shippingFullName: order.order_meta.shipping_firstname + ' ' + order.order_meta.shipping_lastname,
      shippingEmail: order.order_meta.shipping_email,
      shippingPhone: order.order_meta.shipping_phone,
      shippingAddress: order.order_meta.shipping_address1,
      shippingCP: order.order_meta.shipping_postcode,
      shippingCity: order.order_meta.shipping_city,
    },
    billingInfo: {
      billingFullName: order.order_meta.billing_firstname + ' ' + order.order_meta.billing_lastname,
      billingEmail: order.order_meta.billing_email,
      billingPhone: order.order_meta.billing_phone,
      billingAddress: order.order_meta.billing_address1,
      billingAddress2: order.order_meta.billing_address2,
      billingCP: order.order_meta.billing_postcode,
      billingCity: order.order_meta.billing_city,
      billingState: order.order_meta.billing_state,
      billingNif: order.order_meta.billing_cif,
      billingCountry: order.order_meta.billing_country,
    },
  }
}

const shippingSuplementsAmount = (shippingSupplements: any) => {
  return shippingSupplements.reduce((acc: number, supplement: any) => {
    return acc + supplement.amount
  }, 0)
}

const getBoxImage = (sku: string) => {
  return sku.includes('IM') ? 'M' : sku.includes('XL') ? 'XL' : 'S'
}

const unpaidOrderStates = ['pending', 'failed']
