import type { H3Event } from 'h3'
import type { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import { UpdateItem } from '~/server/contexts/backend/subscriptions/application/update-item/UpdateItem'
import type { updateItemPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const updateItemData: updateItemPayload = await readBody(event)
    console.log('updateItemData', updateItemData)

    const updateItem = new UpdateItem(new StrapiSubscriptionsRepository(JWT))
    return await updateItem.execute(updateItemData)
  }
  catch (error: Strapi3Error) {
    console.log('Error', error)
    return error.data
  }
})
