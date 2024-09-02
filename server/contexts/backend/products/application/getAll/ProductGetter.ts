import {ProductRepository} from "~/server/contexts/backend/products/domain/ProductRepository";
import {Product} from "~/server/contexts/backend/products/domain/Product";

export class ProductGetter {
    constructor(private readonly repository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.repository.getAll()
    }
}
