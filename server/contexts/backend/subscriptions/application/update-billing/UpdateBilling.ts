import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class UpdateBilling {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {
  }

  async execute(metaId: number, newBillingMeta: any): Promise<void> {
    await this.subscriptionRepository.updateBillingMeta(metaId, newBillingMeta)
  }
}
