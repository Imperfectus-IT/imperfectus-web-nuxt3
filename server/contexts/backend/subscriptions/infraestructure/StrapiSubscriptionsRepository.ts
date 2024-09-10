import type { NitroRuntimeConfig } from 'nitropack'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'

export class StrapiSubscriptionsRepository implements SubscriptionRepository {
  private readonly config: NitroRuntimeConfig = useRuntimeConfig()

  constructor(private readonly JWT: string) {}

  async getById(id: number): Promise<Subscription | null> {
    console.log(this.config)
    const subscription = await $fetch(`${this.config.STRAPI_URL}/subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
    console.log(subscription)
    return this.createSubscription(subscription)
  }

  async getByUserId(userId: number): Promise<Subscription[] | null> {
    const subscriptions = await $fetch(`${this.config.STRAPI_URL}/subscriptions?user=${userId}&_sort=created_at%3Adesc`, {
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
    return Promise.all(subscriptions.map((subscription: any) => this.createSubscription(subscription)))
  }

  private createSubscription(subscription: any): Subscription {
    return {
      id: subscription.id,
      status: subscription.status,
      frequency: subscription.frequency,
      skip: subscription.skip,
      nextPayment: subscription.nextPayment,
      nextDeliveryDateFromPaused: subscription.nextDeliveryDateFromPaused,
      cancelledAt: subscription.cancelledAt,
      preferredDay: subscription.preferredDay,
      subscriptionItems: subscription.subscription_items,
      donations: subscription.given,
      subscriptionMeta: subscription.subscription_meta,
      preferredHour: subscription.preferredHour,
      coupon: subscription.coupon,
      payment: subscription.payment,
    }
  }
}
