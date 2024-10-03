import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class UpdateShipping {
  constructor(private subscriptionRepository: SubscriptionRepository) {
  }

  async execute(metaId: number, newShippingMeta: SubscriptionShipping) {
    return await this.subscriptionRepository.updateShipping(metaId, newShippingMeta)
  }
}
