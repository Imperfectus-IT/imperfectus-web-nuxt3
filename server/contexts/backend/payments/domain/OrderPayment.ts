export class OrderPayment {
  constructor(
    public readonly id: number,
    public readonly paymentMethod: string,
    public readonly cardNumber: string,
    public readonly cardCountry: string,
    public readonly cardBrand: string,
    public readonly currency: string,
    public readonly expiryMonth: number,
    public readonly expiryYear: number,
    public readonly isPaid: boolean,
    public readonly paidAt: string,
    public readonly order: number,
    public readonly totalAmount: number,
    public readonly totalRefund: number,
  ) {
  }
}
