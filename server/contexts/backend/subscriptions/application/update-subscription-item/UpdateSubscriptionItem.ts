import type { updateSubscriptionItemPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class UpdateSubscriptionItem {
  constructor(private subscriptionRepository: SubscriptionRepository) {
  }

  async execute(updateSubscriptionItemData: updateSubscriptionItemPayload) {
    return await this.subscriptionRepository.updateSubscriptionItem(updateSubscriptionItemData)
  }
}
