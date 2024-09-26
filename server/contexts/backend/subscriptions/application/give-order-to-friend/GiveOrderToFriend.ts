import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class GiveOrderToFriend {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, giveOrderToFriendData: DonationPayload) {
    return this.repository.giveOrderToFriend(subscriptionId, giveOrderToFriendData)
  }
}
