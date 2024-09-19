import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterById,
} from '~/server/contexts/backend/subscriptions/application/get-by-id/SubscriptionGetterById'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { id } = event.context.params
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const subscriptionRepository = new StrapiSubscriptionsRepository(JWT)
    const subscriptionGetter = new SubscriptionGetterById(subscriptionRepository)
    return subscriptionGetter.execute(id)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error.data)
    return error.data
  }
})
