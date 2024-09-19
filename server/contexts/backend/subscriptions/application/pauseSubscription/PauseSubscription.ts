import type { PauseSubscriptionPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class PauseSubscription {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, pauseSubscriptionData: PauseSubscriptionPayload) {
    return this.repository.pauseSubscription(subscriptionId, pauseSubscriptionData)
  }
}
