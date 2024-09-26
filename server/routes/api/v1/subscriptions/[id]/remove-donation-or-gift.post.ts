import type { Strapi3Error } from '@nuxtjs/strapi'

import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'

import {
  RemoveDonationOrGift,
} from '~/server/contexts/backend/subscriptions/application/remove-donation-or-gift/RemoveDonationOrGift'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id: subscriptionId } = event.context.params
    const { date } = await readBody(event)
    if (!subscriptionId) {
      return new Error('Missing parameters')
    }

    const removeDonationOrGift = new RemoveDonationOrGift(new StrapiSubscriptionsRepository(JWT))
    await removeDonationOrGift.execute(subscriptionId, date)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error.data
  }
})
