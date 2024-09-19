import type { H3Event } from 'h3'

import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterById,
} from '~/server/contexts/backend/subscriptions/application/get-by-id/SubscriptionGetterById'
import {
  PauseSubscription,
} from '~/server/contexts/backend/subscriptions/application/pause-subscription/PauseSubscription'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id } = event.context.params
    const { reasonPaused, reasonPausedText, nextDeliveryDate } = await readBody(event)
    if (!id || !reasonPaused || !nextDeliveryDate) {
      return new Error('Missing parameters')
    }

    const pauseSubscription = new PauseSubscription(new StrapiSubscriptionsRepository(JWT))
    await pauseSubscription.execute(id, { reasonPaused, reasonPausedText, nextDeliveryDate })

    const subscriptionGetter = new SubscriptionGetterById(new StrapiSubscriptionsRepository(JWT))
    return await subscriptionGetter.execute(id)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error.data)
    return error.data
  }
})
