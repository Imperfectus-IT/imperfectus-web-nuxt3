import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { CancelSubscriptionPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class SubscriptionGetterByUserId {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, cancelSubscriptionPayload: CancelSubscriptionPayload) {
    return this.repository.cancelSubscription(subscriptionId, cancelSubscriptionPayload)
  }
}
