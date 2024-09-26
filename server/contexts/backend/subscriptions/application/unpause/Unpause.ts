import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class Unpause {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {
  }

  async execute(subscriptionId: number): Promise<void> {
    await this.subscriptionRepository.unpause(subscriptionId)
  }
}
