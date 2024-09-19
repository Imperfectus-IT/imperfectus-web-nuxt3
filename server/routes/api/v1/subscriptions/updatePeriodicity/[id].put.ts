import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  UpdateSubscriptionPeriodicity,
} from '~/server/contexts/backend/subscriptions/application/updateSubscriptionPeriodicity/UpdateSubscriptionPeriodicity'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import {
  SubscriptionGetterById,
} from '~/server/contexts/backend/subscriptions/application/getById/SubscriptionGetterById'

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

    const updateSubscriptionPeriodicity = new UpdateSubscriptionPeriodicity(new StrapiSubscriptionsRepository(JWT))
    await updateSubscriptionPeriodicity.execute(id, { frequency, preferredDay, preferredHour })

    const subscriptionGetter = new SubscriptionGetterById(new StrapiSubscriptionsRepository(JWT))
    return await subscriptionGetter.execute(id)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error.data)
    return error.data
  }
})
