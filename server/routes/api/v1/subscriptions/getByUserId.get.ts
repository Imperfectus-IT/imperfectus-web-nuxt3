import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterByUserId,
} from '~/server/contexts/backend/subscriptions/application/getByUserId/SubscriptionGetterByUserId'

export default defineEventHandler(async (event: H3Event) => {
  try {
    console.log('subscriptions BY USER ID')
    const { user } = await getQuery(event)
    const JWT: string | null = event.headers.get('authorization')
    console.log(JWT)
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const StrapiRepository = new StrapiSubscriptionsRepository(JWT)
    const subscriptionGetter = new SubscriptionGetterByUserId(StrapiRepository)
    return await subscriptionGetter.execute(JSON.parse(user))
  }
  catch (error: Strapi3Error) {
    console.log('Error', error.data)
    return error.data
  }
})
