import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class SubscriptionGetterById {
  constructor(private readonly repository: SubscriptionRepository) {
  }

  execute(id: number) {
    console.log('ID')
    return this.repository.getById(id)
  }
}
