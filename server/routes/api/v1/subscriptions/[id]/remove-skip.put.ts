import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  RemoveDonationOrGift,
} from '~/server/contexts/backend/subscriptions/application/remove-donation-or-gift/RemoveDonationOrGift'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import { RemoveSkip } from '~/server/contexts/backend/subscriptions/application/remove-skip/RemoveSkip'

export default defineEventHandler(async (event: H3Event<Request>) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id: subscriptionId } = event.context.params
    if (!subscriptionId) {
      return new Error('Missing parameters')
    }
    const { skip } = await readBody(event)

    const removeSkip = new RemoveSkip(new StrapiSubscriptionsRepository(JWT))
    return await removeSkip.execute(subscriptionId, skip)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error.data
  }
})
