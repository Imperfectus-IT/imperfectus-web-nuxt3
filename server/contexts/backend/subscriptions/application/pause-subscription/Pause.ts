import type { PauseSubscriptionPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class Pause {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, pauseSubscriptionData: PauseSubscriptionPayload) {
    return this.repository.pause(subscriptionId, pauseSubscriptionData)
  }
}
