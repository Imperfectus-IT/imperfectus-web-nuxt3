import type { H3Event } from 'h3'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterById,
} from '~/server/contexts/backend/subscriptions/application/getById/SubscriptionGetterById'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = event.context.params
  const JWT: string | null = event.headers.get('authorization')
  if (!JWT) {
    return new Error('Unauthorized')
  }
  const subscriptionRepository = new StrapiSubscriptionsRepository(JWT)
  const subscriptionGetter = new SubscriptionGetterById(subscriptionRepository)
  return subscriptionGetter.execute(id)
})
