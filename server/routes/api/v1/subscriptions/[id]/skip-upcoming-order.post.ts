import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import { SkipAnOrder } from '~/server/contexts/backend/subscriptions/application/skip-an-order/SkipAnOrder'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const { id } = event.context.params
    if (!id) {
      return new Error('Missing parameters')
    }
    const { newDatesToSkip } = await readBody(event)
    if (!newDatesToSkip) {
      return new Error('Missing body')
    }
    const skipUpcomingOrder = new SkipAnOrder(new StrapiSubscriptionsRepository(JWT))
    await skipUpcomingOrder.execute(id, newDatesToSkip)
  }
  catch (error: Strapi3Error) {
    console.error(error.data)
    return error
  }
})
