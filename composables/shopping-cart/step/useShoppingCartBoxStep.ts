import { useGetOrderAmount } from '~/composables/admin/orders/application/getOrderAmount/useGetOrderAmount.ts'

export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { activeBoxProducts } = useProductsState()
  const { executeGetOrderAmount } = useGetOrderAmount()
  const { generateSku } = useGenerateSku()
  const onSetBoxSize = async (boxSize: string) => {
    if (shoppingCart.value.currentItem) {
      shoppingCart.value.currentItem.boxSize = boxSize
      const newSku = generateSku(shoppingCart.value.currentItem.boxType, shoppingCart.value.currentItem.boxSize, WEEKLY_FREQUENCY)
      shoppingCart.value.currentItem.product = activeBoxProducts.value.find((boxProduct: BoxProduct) => boxProduct.sku === newSku) as BoxProduct
      shoppingCart.value.currentItem.amount = shoppingCart.value.currentItem.product?.price ?? 0
    }
    const couponApplied = shoppingCart.value.items[0]?.coupon
    if (couponApplied) {
      shoppingCart.value.currentItem.coupon = couponApplied
    }
    const newAmount = await executeGetOrderAmount({ items: [...shoppingCart.value.items, shoppingCart.value.currentItem] })
    shoppingCart.value.amount.subtotal = parseFloat(newAmount.subtotal.toFixed(2))
    shoppingCart.value.amount.shippingCost = parseFloat(newAmount.shipping.toFixed(2))
    shoppingCart.value.amount.saved = parseFloat(newAmount.savedWithTax.toFixed(2))
    shoppingCart.value.amount.total = parseFloat(newAmount.total.toFixed(2))
  }

  return {
    onSetBoxSize,
  }
}
