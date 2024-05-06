export interface OrderPayment {
  id: number;
  totalAmount: number;
  currency: string;
  authorisationCode: any;
  cardNumber: any;
  cardCountry: any;
  cardBrand: any;
  isPaid: boolean;
  paidAt: any;
  paymentMethod: string;
  order: number;
  reference: any;
  totalDiscount: number;
  totalTax: number;
  created_at: string;
  updated_at: string;
  notification_hash: string;
  totalRefund: any;
}
