import type { NitroRuntimeConfig } from 'nitropack'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type {
  PauseSubscriptionPayload,
  PeriodicityPayload,
} from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export class StrapiSubscriptionsRepository implements SubscriptionRepository {
  private readonly config: NitroRuntimeConfig = useRuntimeConfig()

  constructor(private readonly JWT: string) {
  }

  async getById(id: number): Promise<Subscription | null> {
    const subscription = await $fetch(`${this.config.STRAPI_URL}/subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
    return this.createSubscription(subscription)
  }

  async getByUserId(userId: number): Promise<Subscription[] | null> {
    const subscriptions = await $fetch(`${this.config.STRAPI_URL}/subscriptions?user=${userId}&_sort=created_at%3Adesc`, {
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
    return Promise.all(subscriptions.map((subscription: unknown) => this.createSubscription(subscription)))
  }

  async updateSubscriptionPeriodicity(subscriptionId: number, periodicity: PeriodicityPayload) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: periodicity,
    })
  }

  async unpauseSubscription(subscriptionId: number) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/unpauseSubscription`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
  }

  async pauseSubscription(subscriptionId: number, pauseSubscriptionData: PauseSubscriptionPayload) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/pauseSubscription`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: pauseSubscriptionData,
    })
  }

  async skipAnOrder(subscriptionId: number, skip: string[]): Promise<void> {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/skipAnOrder`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: { skip },
    })
  }

  private createSubscription(subscription: unknown): Subscription {
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
