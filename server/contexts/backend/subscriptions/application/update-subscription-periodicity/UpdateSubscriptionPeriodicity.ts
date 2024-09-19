import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { PeriodicityPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class UpdateSubscriptionPeriodicity {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, periodicity: PeriodicityPayload) {
    return this.repository.updateSubscriptionPeriodicity(subscriptionId, periodicity)
  }
}
