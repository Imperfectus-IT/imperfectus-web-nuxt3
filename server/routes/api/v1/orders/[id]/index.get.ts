import type { H3Event } from 'h3'
import { OrderGetterById } from '~/server/contexts/backend/orders/application/getById/OrderGetterById'
import { StrapiOrderRepository } from '~/server/contexts/backend/orders/infraestructure/StrapiOrderRepository'

export default defineEventHandler(async (event: H3Event) => {
  console.log('GET BY ORDER ID')
  const { id } = event.context.params
  console.log(id)
  const JWT: string | null = event.headers.get('authorization')
  if (!JWT) {
    return new Error('Unauthorized')
  }
  const orderRepository = new OrderGetterById(new StrapiOrderRepository(JWT))
  return await orderRepository.execute(id)
})
