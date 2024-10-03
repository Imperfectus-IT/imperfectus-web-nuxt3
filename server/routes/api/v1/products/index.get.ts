import type { H3Event } from 'h3'
import { StrapiProductRepository } from '~/server/contexts/backend/products/infrastructure/StrapiProductRepository'
import { ProductGetter } from '~/server/contexts/backend/products/application/get-all/ProductGetter'

export default defineCachedEventHandler(async (event: H3Event) => {
  const CACHE_DURATION = 3600
  const cacheKey = 'products-cache'
  const strapiProductRepository = new StrapiProductRepository()
  const productGetter = new ProductGetter(strapiProductRepository)

  const cachedData = await useStorage().getItem(cacheKey)

  if (cachedData) {
    return cachedData
  }

  const products = await productGetter.execute()
  await useStorage().setItem(cacheKey, products, CACHE_DURATION)

  return products
})
