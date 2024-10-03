import type { BoxProductType } from '~/server/contexts/backend/products/domain/types/ProductTypes'

export class BoxProduct implements BoxProductType {
  constructor(
    public readonly id: number,
    public readonly sku: string,
    public readonly price: number,
    public readonly isActive: boolean,
    public readonly weight: number,
    public readonly nameEs: string,
    public readonly nameCa: string,
    public readonly descriptionEs: string,
    public readonly descriptionCa: string,
    public readonly image: string | string[],
    public readonly type: string,
    public readonly boxType: string,
    public readonly frequency: string,
    public readonly isImperfectusProduct: boolean,
  ) {
  }
}
