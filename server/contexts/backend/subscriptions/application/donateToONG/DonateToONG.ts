import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { DonationPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class SubscriptionGetterByUserId {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(donation: DonationPayload) {
    return this.repository.donateToONG(donation)
  }
}
