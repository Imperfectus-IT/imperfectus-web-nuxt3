import type { NitroRuntimeConfig } from 'nitropack'
import type { OrderRepository } from '~/server/contexts/backend/orders/domain/OrderRepository'
import { Order } from '~/server/contexts/backend/orders/domain/Order'

export class StrapiOrderRepository implements OrderRepository {
  private readonly config: NitroRuntimeConfig = useRuntimeConfig()

  constructor(private readonly JWT: string) {}

  async getById(id: string): Promise<Order> {
    const order = await $fetch(`${this.config.STRAPI_URL}/orders/${id}`, {
      headers: {
        Authorization: `${this.JWT}`,
      },
      method: 'GET',
    })
    return this.createOrder(order)
  }

  async getByUserId(userId: number): Promise<Order[]> {
    const orders = await $fetch(`${this.config.STRAPI_URL}/orders?userId=${userId}`, {
      headers: {
        Authorization: `${this.JWT}`,
      },
      method: 'GET',
    })
    return Promise.all(orders.map(order => this.createOrder(order)))
  }

  async create(order: Order): Promise<any> {
    const newOrder = await $fetch(`${this.config.STRAPI_URL}/orders`, {
      headers: {
        Authorization: `${this.JWT}`,
      },
      body: {
        order,
      },
      method: 'POST',
    })
    console.log('newOrder', newOrder)
  }

  private createOrder(order): Order {
    return new Order(
      order.status,
      order.deliveryDate,
      order.orderReview,
      order.order_id,
      order.discarded,
      order.order_meta,
      order.user,
      order.order_items,
      order.id,
      order.subscription,
    )
  }
}
