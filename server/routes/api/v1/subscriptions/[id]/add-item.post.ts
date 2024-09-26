import type { H3Event } from 'h3'
import { Strapi3Error } from '@nuxtjs/strapi'
import {
  StrapiSubscriptionsRepository,
} from '~/server/contexts/backend/subscriptions/infraestructure/StrapiSubscriptionsRepository'
import type { AddItemPayload } from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'
import { AddItem } from '~/server/contexts/backend/subscriptions/application/add-item/AddItem'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const JWT: string | null = event.headers.get('authorization')
    if (!JWT) {
      return new Error('Unauthorized')
    }
    const addItemPayload: AddItemPayload = await readBody(event)
    if (!addItemPayload) {
      return new Error('Body is missing')
    }
    const addItem = new AddItem(new StrapiSubscriptionsRepository(JWT))
    await addItem.execute(addItemPayload)
  }
  catch (error: Strapi3Error) {
    console.error(error)
    return error.data
  }
})
