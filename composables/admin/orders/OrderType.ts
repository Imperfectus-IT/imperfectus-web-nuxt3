export interface Order {
    id: number,
    order_id: number,
    status: string,
    deliveryDate: string,
    sku: string;
    amount: string;
    exclusions: string[];
}