import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class RemoveCoupon {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number) {
    return this.repository.removeSubscriptionCoupon(subscriptionId)
  }
}
