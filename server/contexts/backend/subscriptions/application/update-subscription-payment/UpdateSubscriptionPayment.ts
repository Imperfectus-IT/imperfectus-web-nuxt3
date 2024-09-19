import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class UpdateSubscriptionPayment {
  constructor(private subscriptionRepository: SubscriptionRepository) {
  }

  async execute(subscriptionId: number, paymentId: number) {
    return await this.subscriptionRepository.updateSubscriptionPayment(subscriptionId, paymentId)
  }
}
