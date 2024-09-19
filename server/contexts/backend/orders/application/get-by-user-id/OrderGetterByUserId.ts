import type { OrderRepository } from '~/server/contexts/backend/orders/domain/OrderRepository'

export class OrderGetterByUserId {
  constructor(private readonly repository: OrderRepository) {}

  async execute(userId: number): Promise<Order[]> {
    return this.repository.getByUserId(userId)
  }
}
