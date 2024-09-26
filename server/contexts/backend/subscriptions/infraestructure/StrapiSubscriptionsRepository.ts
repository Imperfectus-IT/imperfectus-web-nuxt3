import type { NitroRuntimeConfig } from 'nitropack'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type {
  CancelSubscriptionPayload,
  DonationPayload,
  PauseSubscriptionPayload,
  PeriodicityPayload,
} from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes'

export class StrapiSubscriptionsRepository implements SubscriptionRepository {
  private readonly config: NitroRuntimeConfig = useRuntimeConfig()

  constructor(private readonly JWT: string) {
  }

  async addCoupon(_subscriptionId: number, _coupon: string): Promise<void> {
    // return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/coupon`, {
    //   method: 'PUT',
    //   body: { coupon },
    //   headers: {
    //     Authorization: `Bearer ${this.JWT}`,
    //   },
    // })
  }

  async addItem(addItemPayload: unknown): Promise<void> {
    return await $fetch(`${this.config.STRAPI_URL}/subscription-items`, {
      method: 'POST',
      body: addItemPayload,
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
  }

  async cancelDonationOrGift(subscriptionId: number, date: string) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/removeDonationOrGift`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: { date },
    })
  }

  async cancel(subscriptionId: number, cancelSubscriptionData: CancelSubscriptionPayload): Promise<void> {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/cancel`, {
      method: 'PUT',
      body: cancelSubscriptionData,
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
  }

  async donateToONG(subscriptionId: number, donationData: DonationPayload): Promise<void> {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/giveOrder`, {
      method: 'POST',
      body: donationData,
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
  }

  async giveOrderToFriend(subscriptionId: number, giveOrderToFriendData: DonationPayload) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/giveOrder`, {
      method: 'POST',
      body: giveOrderToFriendData,
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
    })
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

  async pause(subscriptionId: number, pauseSubscriptionData: PauseSubscriptionPayload) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/pauseSubscription`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: pauseSubscriptionData,
    })
  }

  async removeSkip(subscriptionId: number, skip: string[]): Promise<void> {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: { skip },
    })
  }

  async skipAnOrder(subscriptionId: number, newDatesToSkip: string[]): Promise<void> {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/upcomingOrders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: {
        newDatesToSkip,
      },
    })
  }

  async updatePeriodicity(subscriptionId: number, periodicity: PeriodicityPayload) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: periodicity,
    })
  }

  async unpause(subscriptionId: number) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}/unpauseSubscription`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
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
