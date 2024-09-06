export interface OrderRepository {
  getByUserId(userId: number): Promise<Order[]>
  getById(id: string): Promise<Order>
  create(order: Order): Promise<Order[]>
}
