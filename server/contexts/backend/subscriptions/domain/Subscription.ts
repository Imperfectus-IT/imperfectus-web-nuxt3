import type { SubscriptionShipping } from './SubscriptionShipping'
import type { SubscriptionBilling } from './SubscriptionBilling'
import type { SubscriptionItem } from '~/server/contexts/backend/subscriptions-items/domain/SubscriptionItem'
import type { User } from '~/server/contexts/backend/users/domain/User'

export class Subscription {
  constructor(
    public readonly id: number,
    public readonly user: User,
    public readonly status: string,
    public readonly frequency: string,
    public readonly skip: string[],
    public readonly nextPayment: string,
    public readonly nextDeliveryDateFromPaused: string,
    public readonly cancelledAt: string,
    public readonly preferredDay: string,
    public readonly subscriptionItems: SubscriptionItem[],
    public readonly donations: object[] | [],
    public readonly subscriptionMetaId: number,
    public readonly shippingAddress: SubscriptionShipping,
    public readonly billingAddress: SubscriptionBilling,
    public readonly preferredHour: string,
    public readonly payment: Payment,
  ) {
  }
}
