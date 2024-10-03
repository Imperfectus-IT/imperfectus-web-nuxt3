import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import { UpdatePayment } from '~/server/contexts/backend/subscriptions/application/update-payment/UpdatePayment'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    console.log('event', event.context.params)
    const { id: subscriptionId } = event.context.params
    if (!subscriptionId) {
      return new Error('ID is required')
    }

    const { paymentId } = await readBody(event)
    if (!paymentId) {
      return new Error('Payment ID is required')
    }

    const updatePayment = new UpdatePayment(new StrapiSubscriptionsRepository(JWT))
    return await updatePayment.execute(subscriptionId, paymentId)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error
  }
})
