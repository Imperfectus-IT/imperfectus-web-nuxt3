export class SubscriptionPayment {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly paymentMethod: string,
    public readonly cardNumber: string,
    public readonly cardCountry: string,
    public readonly cardBrand: string,
    public readonly currency: string,
    public readonly expiryMonth: number,
    public readonly expiryYear: number,
  ) {
  }
}
