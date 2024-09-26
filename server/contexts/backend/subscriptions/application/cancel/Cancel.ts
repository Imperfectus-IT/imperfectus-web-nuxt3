import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { CancelSubscriptionPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class Cancel {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, cancelSubscriptionData: CancelSubscriptionPayload) {
    return this.repository.cancel(subscriptionId, cancelSubscriptionData)
  }
}
