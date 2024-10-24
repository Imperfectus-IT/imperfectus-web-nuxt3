// export type Product = {
//   id?: number
//   sku?: string
//   price: number
//   name_ca: string
//   name_es: string
//   description_ca: string
//   description_es: string
//   boxType?: string
//   itemType?: string
//   type: string
//   frequency?: string
//   images: string[]
// }

// export type ProductExclusion = Pick<Product, 'id' | 'sku' | 'name'>
//
// // export type ProductExclusion = {
// //   id: number
// //   sku: string
// //   name: string
// // }
//
// export type ProductDetail = {
//   id: number
//   sku: string
//   name: string
//   description: string
//   price: number
// }
//
// export function createProductExclusion(product: any, locale: string): ProductExclusion {
//   return {
//     id: product.id,
//     sku: product.SKU,
//     name: product[`name_${locale}`],
//   }
// }
//
// export function createProductDetail(product: any, locale: string): ProductExclusion {
//   return {
//     id: product.id,
//     sku: product.SKU,
//     name: product[`name_${locale}`],
//     description: product[`description_${locale}`],
//     price: product?.price,
//   }
// }
//
// export function isBoxProduct({ boxType }: Product): boolean {
//   return boxType === 'box'
// }
