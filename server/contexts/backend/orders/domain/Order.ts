export class Order {
  public readonly isValidForReview: boolean

  constructor(
    public readonly status: string,
    public readonly deliveryDate: string,
    public readonly orderReview: string,
    public readonly order_id: number,
    public readonly discarded: boolean,
    public readonly orderMeta: unknow,
    public readonly user: User,
    public readonly orderItems: unknown,
    public readonly id?: string,
    public readonly subscription?: string,
  ) {
    this.isValidForReview = status === 'completed'
  }
}
