import { StrapiProductRepository } from '~/server/contexts/backend/products/infrastructure/StrapiProductRepository'
import { ProductGetter } from '~/server/contexts/backend/products/application/get-all/ProductGetter'

export default defineCachedEventHandler(async () => {
  const strapiProductRepository = new StrapiProductRepository()
  const productGetter = new ProductGetter(strapiProductRepository)
  return await productGetter.execute()
})
