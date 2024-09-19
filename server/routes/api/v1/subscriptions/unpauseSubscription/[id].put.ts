import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterById,
} from '~/server/contexts/backend/subscriptions/application/get-by-id/SubscriptionGetterById'
import {
  UnpauseSubscription,
} from '~/server/contexts/backend/subscriptions/application/unpause-subscription/UnpauseSubscription'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id } = event.context.params
    if (!id) {
      return new Error('Missing parameters')
    }

    const unpauseSubscription = new UnpauseSubscription(new StrapiSubscriptionsRepository(JWT))
    await unpauseSubscription.execute(id)

    const subscriptionGetter = new SubscriptionGetterById(new StrapiSubscriptionsRepository(JWT))
    return await subscriptionGetter.execute(id)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error.data)
    return error.data
  }
})
