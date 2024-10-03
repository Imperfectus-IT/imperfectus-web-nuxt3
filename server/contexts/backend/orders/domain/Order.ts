import type { OrderBilling } from './OrderBilling'
import type { OrderShipping } from './OrderShipping'
import type { User } from '~/server/contexts/backend/users/domain/User'
import type { OrderPayment } from '~/server/contexts/backend/payments/domain/OrderPayment'
import type { OrderItem } from '~/server/contexts/backend/orders-items/domain/OrderItem'

export class Order {
  static COMPLETED_STATUS = 'completed'

  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly user: User,
    public readonly status: string,
    public readonly deliveryDate: string,
    public readonly deliveryHour: string | null,
    public readonly orderReview: string,
    public readonly discarded: boolean,
    public readonly orderMetaId: number,
    public readonly orderShipping: OrderShipping,
    public readonly orderBilling: OrderBilling,
    public readonly orderItems: OrderItem[],
    public readonly payment: OrderPayment,
    public readonly subscription?: number,
  ) {
  }

  public isValidForReview(): boolean {
    return this.status === this.COMPLETED_STATUS
  }
}
