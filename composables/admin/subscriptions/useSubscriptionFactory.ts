export const useSubscriptionFactory = (subscription: any): Subscription => {
  const domainSubscription: Subscription = {
    id: subscription.id,
    status: subscription.status,
    frequency: subscription.frequency,
    nextPayment: subscription.nextPayment,
    preferredDay: subscription.preferredDay,
    cancelledAt: subscription.cancelledAt,
    donations: subscription.given?.map((donation: any) => donation.order_date),
    subscriptionItems: subscription.subscription_items.map((item: any) => {
      return {
        amount: item.amount,
        sku: item.product.SKU,
        image: `images/boxes/Caixa-${getBoxImage(item?.product.SKU)}.webp`,
        exclusions: item.exclusions.map((exclusion: any) => {
          return exclusion.name_es
        }),
      }
    }),
    subscriptionMeta: subscription.subscription_meta,
    skip: subscription.skip ? [...subscription.skip] : [],
  }
  return domainSubscription
}

const getBoxImage = (sku: string) => {
  return sku?.includes('IM') ? 'M' : sku.includes('XL') ? 'XL' : 'S'
}
