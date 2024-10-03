import type { H3Event } from 'h3'
import { OrderGetterById } from '~/server/contexts/backend/orders/application/get-by-id/OrderGetterById'
import { StrapiOrderRepository } from '~/server/contexts/backend/orders/infraestructure/StrapiOrderRepository'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = event.context.params
  const JWT: string | null = event.headers.get('authorization')
  if (!JWT) {
    return new Error('Unauthorized')
  }
  if (!id) {
    return new Error('Id is mandatory')
  }
  const getOrderById = new OrderGetterById(new StrapiOrderRepository(JWT))
  return await getOrderById.execute(id)
})
