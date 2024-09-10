import type { H3Event } from 'h3'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterByUserId,
} from '~/server/contexts/backend/subscriptions/application/getByUserId/SubscriptionGetterByUserId'

export default defineEventHandler(async (event: H3Event) => {
  const { user } = await getQuery(event)
  const JWT: string | null = event.headers.get('authorization')
  if (!JWT) {
    return new Error('Unauthorized')
  }
  const StrapiRepository = new StrapiSubscriptionsRepository(JWT)
  const subscriptionGetter = new SubscriptionGetterByUserId(StrapiRepository)
  return await subscriptionGetter.execute(JSON.parse(user))
})
