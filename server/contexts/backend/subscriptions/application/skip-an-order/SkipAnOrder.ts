import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class SkipAnOrder {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {
  }

  async execute(subscriptionId: number, newDatesToSkip: string[]): Promise<void> {
    await this.subscriptionRepository.skipAnOrder(subscriptionId, newDatesToSkip)
  }
}
