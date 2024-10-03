import type { NitroRuntimeConfig } from 'nitropack'
import type { OrderRepository } from '~/server/contexts/backend/orders/domain/OrderRepository'
import type { Order } from '~/server/contexts/backend/orders/domain/Order'
import { OrderMapper } from '~/server/contexts/backend/orders/infraestructure/OrderMapper'

export class StrapiOrderRepository implements OrderRepository {
  private readonly config: NitroRuntimeConfig = useRuntimeConfig()

  constructor(private readonly JWT: string) {
  }

  async getById(id: string): Promise<Order> {
    const [order] = await $fetch(`${this.config.STRAPI_URL}/orders?order_id=${id}`, {
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      method: 'GET',
    })
    return Promise.resolve(OrderMapper.toDomain(order))
  }

  async getByUserId(userId: number): Promise<Order[]> {
    const orders = await $fetch(`${this.config.STRAPI_URL}/orders?user=${userId}&discarded=false&_sort=created_at%3Adesc&_limit=10`, {
      headers: {
        Authorization: `Bearer ${this.JWT}`,
      },
      method: 'GET',
    })
    return Promise.all(orders.map(order => OrderMapper.toDomain(order)))
  }

  async create(order: Order): Promise<Order> {
    const newOrder = await $fetch(`${this.config.STRAPI_URL}/orders`, {
      headers: {
        Authorization: `${this.JWT}`,
      },
      body: {
        order,
      },
      method: 'POST',
    })
    return Promise.resolve(OrderMapper.toDomain(newOrder))
  }
}
