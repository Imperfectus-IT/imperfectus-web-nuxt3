import type { H3Event } from 'h3'
import { StrapiOrderRepository } from '~/server/contexts/backend/orders/infraestructure/StrapiOrderRepository'
import { OrderGetterByUserId } from '~/server/contexts/backend/orders/application/get-by-user-id/OrderGetterByUserId'

export default defineEventHandler(async (event: H3Event) => {
  const { user: id } = await getQuery(event)
  const JWT: string | null = event.headers.get('authorization')
  if (!JWT) {
    return new Error('Unauthorized')
  }
  if (!id) {
    return new Error('User id is required')
  }
  const repository = new StrapiOrderRepository(JWT)
  const ordersByUserId = new OrderGetterByUserId(repository)
  return await ordersByUserId.execute(JSON.parse(id))
})
