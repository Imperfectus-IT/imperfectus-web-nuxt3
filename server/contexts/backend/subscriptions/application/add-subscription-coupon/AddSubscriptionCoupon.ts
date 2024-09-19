import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class SubscriptionGetterByUserId {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, coupon: string) {
    return this.repository.addSubscriptionCoupon(subscriptionId, coupon)
  }
}
