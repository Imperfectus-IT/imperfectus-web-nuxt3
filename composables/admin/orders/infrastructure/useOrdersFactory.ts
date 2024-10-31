import { useOrderReviewValidator } from '~/composables/admin/orders/domain/useOrderReviewValidator.ts'
import { ALL_COVERAGES } from '~/composables/locations/domain/CompaniesConstants.ts'

const { isValidForReview } = useOrderReviewValidator()
export const useOrdersFactory = (order: StrapiOrder): Order => {
  return {
    id: order.id,
    order_id: order.order_id,
    status: order.status,
    discarded: order.discaded,
    isValidForReview: isValidForReview(order),
    deliveryDate: order.deliveryDate,
    deliveryHour: order.deliveryHour,
    orderReview: order.order_review,
    orderMeta: order.order_meta.id,
    subscription: order.subscriptions?.length > 0 ? order.subscriptions[0].id : null,
    orderItems: order.order_items.map((order_item: StrapiOrderItem) => {
      return {
        id: order_item.id,
        product: {
          id: order_item.product.id,
          sku: order_item.product.SKU,
          type: order_item.product.type,
          itemType: order_item.product.itemType,
          boxType: order_item.product.boxType,
          isActive: order_item.product.isActive,
        },
        amount: order_item.final_amount ? order_item.final_amount : order_item.amount,
        sku: order_item.product.SKU,
        image: order_item.product?.imagePath?.[0],
        coupon: order_item.coupon_id
          ? {
              coupon: order_item.coupon_id.coupon,
              discountType: order_item.coupon_id.discountType,
              discountValue: order_item.coupon_id.discountValue,
              id: order_item.coupon_id.id,
              isActive: order_item.coupon_id.isActive,
              type: order_item.coupon_id.type,
            }
          : null,
        exclusions: order_item.exclusions?.map((exclusion: any) => {
          return {
            id: exclusion.id,
            nameEs: exclusion.name_es,
            nameCa: exclusion.name_ca,
            product: exclusion.product,
          }
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
      state: order.status,
      amount: order.order_payment.totalAmount,
      shippingCosts: order.order_shipping_supplements,
      total: order.order_payment.totalAmount + shippingSuplementsAmount(order.order_shipping_supplements),
    },
    deliveryInfo: {
      deliveryDate: order.deliveryDate,
      coverage: getCoverageLabel(order.order_meta.shipping_coverage),
      deliveryTime: order.deliveryHour,
      tracking: {
        trackingId: order.order_items[0].trackingId || null,
        trackingUrl: order.order_items[0].trackingUrl || null,
      },
    },
    shippingInfo: {
      shippingFirstName: order.order_meta.shipping_firstname,
      shippingLastName: order.order_meta.shipping_lastname,
      shippingEmail: order.order_meta.shipping_email,
      shippingPhone: order.order_meta.shipping_phone,
      shippingAddress: order.order_meta.shipping_address1,
      shippingAddress2: order.order_meta.shipping_address2,
      shippingPostCode: order.order_meta.shipping_postcode,
      shippingCity: order.order_meta.shipping_city,
      shippingNotes: order.order_meta.shipping_notes,
      shippingState: order.order_meta.shipping_state,
      shippingCountry: order.order_meta.shipping_country,
      shippingCoverage: order.order_meta.shipping_coverage,
    },
    billingInfo: {
      billingFirstName: order.order_meta.billing_firstname,
      billingLastName: order.order_meta.billing_lastname,
      billingEmail: order.order_meta.billing_email,
      billingPhone: order.order_meta.billing_phone,
      billingAddress: order.order_meta.billing_address1,
      billingAddress2: order.order_meta.billing_address2,
      billingPostCode: order.order_meta.billing_postcode,
      billingCity: order.order_meta.billing_city,
      billingState: order.order_meta.billing_state,
      billingCif: order.order_meta.billing_cif,
      billingCountry: order.order_meta.billing_country,
    },
    shippingCoverage: {
      shippingCoverage: order.order_meta.shipping_coverage,
      shippingService: order.order_meta.shipping_service,
      shippingOffice: order.order_meta.shipping_office,
    },
    orderPayment: {
      totalAmount: order.order_payment.totalAmount,
    },
    createdAt: order.created_at,
  }
}

const shippingSuplementsAmount = (shippingSupplements: any) => {
  return shippingSupplements.reduce((acc: number, supplement: any) => {
    return acc + supplement.amount
  }, 0)
}

const getCoverageLabel = (coverageValue: string) => {
  const coverage = Object.values(ALL_COVERAGES).find(coverage => coverage.value === coverageValue)
  return coverage ? coverage.label : 'Unknown Coverage' // Fallback label in case it's not found
}
