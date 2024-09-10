export class Subscription {
  constructor(
    public readonly id: number,
    public readonly status: string,
    public readonly frequency: string,
    public readonly skip: string[],
    public readonly nextPayment: string,
    public readonly nextDeliveryDateFromPaused: string,
    public readonly cancelledAt: string,
    public readonly preferredDay: string,
    public readonly subscriptionItems: never[],
    public readonly donations: string[],
    public readonly subscriptionMeta: object,
    public readonly preferredHour: string,
    public readonly coupon: object | null,
    public readonly payment: object | number,
  ) {}
}
