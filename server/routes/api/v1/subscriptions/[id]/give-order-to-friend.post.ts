import type { H3Event } from 'h3'
import { Strapi3Error } from '@nuxtjs/strapi'
import {
  GiveOrderToFriend,
} from '~/server/contexts/backend/subscriptions/application/give-order-to-friend/GiveOrderToFriend'
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
    if (!subscriptionId) {
      return new Error('Missing parameters')
    }
    const donationData = await readBody(event)

    const giveOrderToFriend = new GiveOrderToFriend(new StrapiSubscriptionsRepository(JWT))
    await giveOrderToFriend.execute(subscriptionId, donationData)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error
  }
})
