import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterByUserId,
} from '~/server/contexts/backend/subscriptions/application/get-by-user-id/SubscriptionGetterByUserId'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { user } = await getQuery(event)
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      console.log('JWT is missing')
      throw createError({ statusCode: 401, statusMessage: 'JWT is missing' })
    }
    const StrapiRepository = new StrapiSubscriptionsRepository(JWT)
    const subscriptionGetter = new SubscriptionGetterByUserId(StrapiRepository)
    return await subscriptionGetter.execute(JSON.parse(user))
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    throw error
  }
})
