export const useSubscriptionFactory = (subscription: any): Subscription => {
  const test = {
    id: subscription.id,
    status: subscription.status,
    frequency: subscription.frequency,
    nextPayment: subscription.nextPayment,
    preferredDay: subscription.preferredDay,
    cancelledAt: subscription.cancelledAt,
    subscriptionItems: subscription.subscription_items.map((item: any) => {
      return {
        price: item.price,
        sku: item.product.SKU,
        image: `images/boxes/Caixa-${getBoxImage(item?.product.SKU)}.webp`,
        exclusions: item.exclusions.map((exclusion: any) => {
          return exclusion.name_es
        }),
      }
    }),
    skip: [],
  }
  return test
}

const getBoxImage = (sku: string) => {
  return sku?.includes('IM') ? 'M' : sku.includes('XL') ? 'XL' : 'S'
}
