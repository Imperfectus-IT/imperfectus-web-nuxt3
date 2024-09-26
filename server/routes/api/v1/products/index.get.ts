import type { H3Event } from 'h3'
import { StrapiProductRepository } from '~/server/contexts/backend/products/infrastructure/StrapiProductRepository'
import { ProductGetter } from '~/server/contexts/backend/products/application/get-all/ProductGetter'

export default defineCachedEventHandler(async (event: H3Event) => {
  console.log('CONTROLLER')
  const strapiProductRepository = new StrapiProductRepository()
  const productGetter = new ProductGetter(strapiProductRepository)
  return await productGetter.execute()
})
