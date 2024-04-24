export interface Order {
    id: number,
    order_id: number,
    status: string,
    delivery_date: string,
    sku: string;
    amount: string;
    exclusions: string[];
}