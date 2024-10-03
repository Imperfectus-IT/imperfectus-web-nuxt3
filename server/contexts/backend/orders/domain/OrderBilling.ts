export class OrderBilling {
  constructor(
    public billingFirstName: string,
    public billingLastName: string,
    public billingEmail: string,
    public billingPhone: string,
    public billingAddress: string,
    public billingAddress2: string,
    public billingPostCode: string,
    public billingCity: string,
    public billingState: string,
    public billingCountry: string,
    public billingCif: string,
  ) {
  }
}
