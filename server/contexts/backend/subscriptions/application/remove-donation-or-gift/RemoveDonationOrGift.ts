import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class RemoveDonationOrGift {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, date: string) {
    return this.repository.cancelDonationOrGift(subscriptionId, date)
  }
}
