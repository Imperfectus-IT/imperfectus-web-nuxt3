import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type { AddItemPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class AddItem {
  constructor(private readonly repository: SubscriptionRepository) {

  }

  execute(addItemPayload: AddItemPayload) {
    return this.repository.addItem(addItemPayload)
  }
}
