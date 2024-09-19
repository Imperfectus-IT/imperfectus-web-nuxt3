import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class RemoveSkip {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(subscriptionId: number, skip: string[]) {
    return this.repository.removeSkip(subscriptionId, skip)
  }
}
