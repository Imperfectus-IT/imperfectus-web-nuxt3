export class Order {
  static COMPLETED_STATUS = 'completed'
  constructor(
    public readonly status: string,
    public readonly deliveryDate: string,
    public readonly orderReview: string,
    public readonly orderId: number,
    public readonly discarded: boolean,
    public readonly orderMeta: unknow,
    public readonly user: User,
    public readonly orderItems: unknown,
    public readonly id?: string,
    public readonly subscription?: string,
  ) {
  }

  public isValidForReview(): boolean {
    return this.status === this.COMPLETED_STATUS
  }
}
