import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  UpdateSubscriptionPeriodicity,
} from '~/server/contexts/backend/subscriptions/application/update-periodicity/UpdateSubscriptionPeriodicity'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterById,
} from '~/server/contexts/backend/subscriptions/application/get-by-id/SubscriptionGetterById'
import {
  UpdatePeriodicity,
} from '~/server/contexts/backend/subscriptions/application/update-periodicity/UpdatePeriodicity'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id } = event.context.params
    const { frequency, preferredDay, preferredHour } = await readBody(event)

    if (!frequency || !preferredDay || !id) {
      return new Error('Missing parameters')
    }

    const updateSubscriptionPeriodicity = new UpdatePeriodicity(new StrapiSubscriptionsRepository(JWT))
    await updateSubscriptionPeriodicity.execute(id, { frequency, preferredDay, preferredHour })

    const subscriptionGetter = new SubscriptionGetterById(new StrapiSubscriptionsRepository(JWT))
    return await subscriptionGetter.execute(id)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error.data)
    return error.data
  }
})
