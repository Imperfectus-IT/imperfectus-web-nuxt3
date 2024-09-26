import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { DonationPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class DonateToONG {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, donationData: DonationPayload) {
    return this.repository.donateToONG(subscriptionId, donationData)
  }
}
