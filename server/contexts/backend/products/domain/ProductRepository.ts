import type { BoxProduct } from './BoxProduct'
import type { ItemProduct } from './ItemProduct'

export interface ProductRepository {
  getAll(): Promise<{ boxProducts: BoxProduct[], itemProducts: ItemProduct[] }>
}
