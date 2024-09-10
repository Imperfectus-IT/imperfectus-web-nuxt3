import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class SubscriptionGetterByUserId {
  constructor(private readonly repository: SubscriptionRepository) {}

  execute(userId: number) {
    return this.repository.getByUserId(userId)
  }
}
