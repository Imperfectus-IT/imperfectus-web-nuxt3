import type { NitroRuntimeConfig } from 'nitropack'
import type { Subscription } from '../domain/Subscription'
import type { SubscriptionBilling } from '../domain/SubscriptionBilling'
import type { SubscriptionShipping } from '../domain/SubscriptionShipping'
import type { SubscriptionRepository } from '~/server/contexts/backend/subscriptions/domain/SubscriptionRepository'
import type {
  CancelSubscriptionPayload,
  DonationPayload,
  PauseSubscriptionPayload,
  PeriodicityPayload, updateItemPayload,
} from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'
import type {
  StrapiSubscription,
} from '~/server/contexts/backend/subscriptions/infraestructure/types/StrapiSubscription'
import { SubscriptionMapper } from '~/server/contexts/backend/subscriptions/infraestructure/SubscriptionMapper'

export class StrapiSubscriptionsRepository implements SubscriptionRepository {
  private readonly config: NitroRuntimeConfig = useRuntimeConfig()
  private readonly mapper: SubscriptionMapper = new SubscriptionMapper()

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
    const [subscription] = await $fetch(`${this.config.STRAPI_URL}/subscriptions?subscription_id=${id}`, {
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

  async updateShipping(metaId: number, newShippingMeta: SubscriptionShipping): Promise<void> {
    const meta = {
      shipping_firstname: newShippingMeta.shippingFirstName,
      shipping_lastname: newShippingMeta.shippingLastName,
      shipping_email: newShippingMeta.shippingEmail,
      shipping_phone: newShippingMeta.shippingPhone,
      shipping_address1: newShippingMeta.shippingAddress,
      shipping_address2: newShippingMeta.shippingAddress2,
      shipping_postcode: newShippingMeta.shippingPostCode,
      shipping_city: newShippingMeta.shippingCity,
      shipping_state: newShippingMeta.shippingState,
      shipping_country: newShippingMeta.shippingCountry,
      shipping_notes: newShippingMeta.shippingNotes,
    }

    return await $fetch(`${this.config.STRAPI_URL}/subscription-metas/${metaId}/shipping`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: { meta },
    })
  }

  async updateBilling(metaId: number, newBillingMeta: SubscriptionBilling): Promise<void> {
    const meta = {
      billing_firstname: newBillingMeta.billingFirstName,
      billing_lastname: newBillingMeta.billingLastName,
      billing_email: newBillingMeta.billingEmail,
      billing_phone: newBillingMeta.billingPhone,
      billing_address1: newBillingMeta.billingAddress,
      billing_address2: newBillingMeta.billingAddress2,
      billing_postcode: newBillingMeta.billingPostCode,
      billing_city: newBillingMeta.billingCity,
      billing_state: newBillingMeta.billingState,
      billing_country: newBillingMeta.billingCountry,
      billing_cif: newBillingMeta.billingCif,
    }
    return await $fetch(`${this.config.STRAPI_URL}/subscription-metas/${metaId}/billing`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: { meta },
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

  async updateItem(updateItemData: updateItemPayload) {
    const { subscriptionItemId, newBoxProduct, exclusions } = updateItemData
    const { amount, weight, id } = newBoxProduct
    return await $fetch(`${this.config.STRAPI_URL}/subscription-items/${subscriptionItemId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: {
        subscriptionItemId,
        product: id,
        amount,
        weight,
        exclusions,
      },
    })
  }

  async updatePayment(subscriptionId: number, paymentId: number) {
    return await $fetch(`${this.config.STRAPI_URL}/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      body: {
        payment: paymentId,
      },
    })
  }

  private createSubscription(subscription: StrapiSubscription) {
    return SubscriptionMapper.toDomain(subscription)
  }
}
