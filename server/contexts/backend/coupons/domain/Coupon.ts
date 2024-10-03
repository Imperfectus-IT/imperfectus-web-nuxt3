export class Coupon {
  constructor(
    public readonly id: number,
    public readonly expire: string,
    public readonly limit: number | null,
    public readonly discountValue: number | null,
    public readonly discountType: number | null,
    public readonly coupon: string,
    public readonly type: string,
    public readonly isActive: boolean,
    public readonly descriptionEs: string,
    public readonly descriptionCa: string,
    public readonly onlyFirstPurchase: boolean,
    public readonly maxOrdersPerUser: number,
    public readonly hasActiveSubscription: boolean,
  ) {
  }
}
