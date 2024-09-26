import { Strapi3Error } from '@nuxtjs/strapi'
import type { H3Event } from 'h3'
import { Cancel } from '~/server/contexts/backend/subscriptions/application/cancel/Cancel'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id: subscriptionId } = event.context.params
    const dataToCancel = await readBody(event)
    if (!subscriptionId) {
      return new Error('Missing parameters')
    }

    const cancelSubscription = new Cancel(new StrapiSubscriptionsRepository(JWT))
    await cancelSubscription.execute(subscriptionId, dataToCancel)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error.data
  }
})
