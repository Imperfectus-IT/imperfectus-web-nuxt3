import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { updateItemPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class UpdateItem {
  constructor(private subscriptionRepository: SubscriptionRepository) {
  }

  async execute(updateSubscriptionItemData: updateItemPayload) {
    return await this.subscriptionRepository.updateItem(updateSubscriptionItemData)
  }
}
