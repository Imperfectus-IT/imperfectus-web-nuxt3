import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import { UpdateBilling } from '~/server/contexts/backend/subscriptions/application/update-billing/UpdateBilling'

export default defineEventHandler(async (event: H3Event): Promise<Subscription> => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }

    const { meta, id: metaId } = await readBody(event)

    const updateBilling = new UpdateBilling(new StrapiSubscriptionsRepository(JWT))
    return await updateBilling.execute(metaId, meta)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error.data
  }
})
