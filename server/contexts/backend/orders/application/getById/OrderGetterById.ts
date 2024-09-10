import type { OrderRepository } from '~/server/contexts/backend/orders/domain/OrderRepository'

export class OrderGetterById {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(id: number): Promise<Order[]> {
    return this.orderRepository.getById(id)
  }
}
