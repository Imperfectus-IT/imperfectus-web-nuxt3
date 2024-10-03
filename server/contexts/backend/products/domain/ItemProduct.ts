import type { ItemProductType } from '~/server/contexts/backend/products/domain/types/ProductTypes'

export class ItemProduct implements ItemProductType {
  constructor(
    public readonly id: number,
    public readonly nameCa: string,
    public readonly nameEs: string,
    public readonly isImperfectusProduct: boolean,
    public readonly image: string | string[],
    public readonly type: string,
    public readonly isActive: boolean,
    public readonly itemType: string,
  ) {
  }
}
