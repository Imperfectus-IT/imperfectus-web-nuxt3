export class Product {
  private constructor(
    public readonly id?: number,
    public readonly sku: string,
    public readonly price: number,
    public readonly isActive: boolean,
    public readonly weight: number,
    public readonly nameEs: string,
    public readonly nameCa: string,
    public readonly descriptionEs: string,
    public readonly descriptionCa: string,
    public readonly image: string,
    public readonly type: string,
    public readonly boxType: string,
    public readonly itemType: string,
    public readonly frequency: string,
  ) {}
}
