import { Strapi3Error } from '@nuxtjs/strapi'
import type { H3Event } from 'h3'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import { DonateToONG } from '~/server/contexts/backend/subscriptions/application/donate-to-ong/DonateToONG'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id: subscriptionId } = event.context.params
    if (!subscriptionId) {
      return new Error('Missing parameters')
    }
    const donationData = await readBody(event)

    const donateToONG = new DonateToONG(new StrapiSubscriptionsRepository(JWT))
    await donateToONG.execute(subscriptionId, donationData)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error
  }
})
