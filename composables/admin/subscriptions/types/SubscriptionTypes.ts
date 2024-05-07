export type Subscription = {
  id: number,
  status: string,
  frequency: string,
  subscriptionItems: SubscriptionItem[],
  skip: string[]
}

export type SubscriptionItem = {
  amount: number
  sku: string
  exclusions: string[]
  image: string
}
