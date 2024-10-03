import type { StrapiOrder } from '~/server/contexts/backend/orders/infraestructure/types/StrapiOrder'
import { Order } from '~/server/contexts/backend/orders/domain/Order'
import { OrderItem } from '~/server/contexts/backend/order-items/OrderItem'
import { Coupon } from '~/server/contexts/backend/coupons/domain/Coupon'
import { OrderPayment } from '~/server/contexts/backend/payments/domain/OrderPayment'
import { BoxProduct } from '~/server/contexts/backend/products/domain/BoxProduct'
import { OrderShipping } from '~/server/contexts/backend/orders/domain/OrderShipping'
import { OrderBilling } from '~/server/contexts/backend/orders/domain/OrderBilling'
import { User } from '~/server/contexts/backend/users/domain/User'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OrderMapper {
  public static toDomain(order: StrapiOrder): Order {
    const { order_meta, order_payment: payment, order_items, user } = order

    const orderItems = order_items.map((item) => {
      const { product, coupon_id: coupon } = item
      return new OrderItem(
        item.id,
        item.quantity,
        item.amount,
        item.exclusions,
        item.image,
        new BoxProduct(
          product.id,
          product.sku,
          product.price,
          product.isActive,
          product.weight,
          product.nameEs,
          product.nameCa,
          product.descriptionEs,
          product.descriptionCa,
          product.image,
          product.type,
          product.boxType,
          product.isImperfectusProduct,
        ),
        item.weight,
        item.coupon_id
          ? new Coupon(
            coupon.id,
            coupon.expire,
            coupon.limit,
            coupon.discountValue,
            coupon.discountType,
            coupon.coupon,
            coupon.type,
            coupon.isActive,
            coupon.descriptionEs,
            coupon.descriptionCa,
            coupon.onlyFirstPurchase,
            coupon.maxOrdersPerUser,
            coupon.hasActiveSubscription,
          )
          : null,
      )
    })

    const orderShipping = new OrderShipping(
      order_meta.shipping_firstname,
      order_meta.shipping_lastname,
      order_meta.shipping_email,
      order_meta.shipping_phone,
      order_meta.shipping_address1,
      order_meta.shipping_address2,
      order_meta.shipping_postcode,
      order_meta.shipping_city,
      order_meta.shipping_state,
      order_meta.shipping_country,
      order_meta.shipping_notes,
    )

    const orderBilling = new OrderBilling(
      order_meta.billing_firstname,
      order_meta.billing_lastname,
      order_meta.billing_email,
      order_meta.billing_phone,
      order_meta.billing_address1,
      order_meta.billing_address2,
      order_meta.billing_postcode,
      order_meta.billing_city,
      order_meta.billing_state,
      order_meta.billing_country,
      order_meta.billing_cif,
    )

    const paymentObject = new OrderPayment(
      payment.id,
      payment.paymentMethod,
      payment.cardNumber,
      payment.cardCountry,
      payment.cardBrand,
      payment.currency,
      payment.expiryMonth,
      payment.expiryYear,
      payment.isPaid,
      payment.paidAt,
      payment.order,
      payment.totalAmount,
      payment.totalRefund,
    )

    const orderUser = new User(
      user.id,
      user.username,
    )

    return new Order(
      order.id,
      order.order_id,
      order.user,
      order.status,
      order.deliveryDate,
      order.deliveryHour,
      order.orderReview,
      order.discarded,
      order_meta.id,
      orderShipping,
      orderBilling,
      orderItems,
      paymentObject,
    )
  }
}
