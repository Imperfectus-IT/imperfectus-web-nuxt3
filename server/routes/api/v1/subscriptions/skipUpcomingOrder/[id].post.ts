import type { H3Event } from 'h3'
import { Strapi3Error } from '@nuxtjs/strapi'

export default defineEventHandler((event: H3Event) => {
  try {
    console.log('SKIP')
  }
  catch (error: Strapi3Error) {
    console.error(error.data)
    return error.data
  }
})
