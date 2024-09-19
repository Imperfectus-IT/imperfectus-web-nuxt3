import { StrapiOrderRepository } from '~/server/contexts/backend/orders/infraestructure/StrapiOrderRepository'
import { OrderGetterByUserId } from '~/server/contexts/backend/orders/application/get-by-user-id/OrderGetterByUserId'

export default defineEventHandler(async (event: H3Event) => {
  console.log('get orders by user id')
  const { user } = await getQuery(event)
  const JWT: string | null = event.headers.get('authorization')
  if (!JWT) {
    return new Error('Unauthorized')
  }
  const repository = new StrapiOrderRepository(JWT)
  const ordersByUserId = new OrderGetterByUserId(repository)
  return await ordersByUserId.execute(JSON.parse(user))
})
