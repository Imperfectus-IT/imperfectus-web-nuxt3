export class Product {
  constructor(
    public readonly id: number,
    public readonly nameEs: string,
    public readonly nameCa: string,
    public readonly isImperfectusProduct: boolean,
    public readonly image: string | string[],
    public readonly type: string,
    public readonly isActive: boolean,
    public readonly itemType: string,
    public readonly weight: number,
    public readonly sku: string,
    public readonly descriptionEs: string,
    public readonly descriptionCa: string,
    public readonly boxType: string,
    public readonly price: number,
    public readonly frequency: string,
  ) {
  }
}
