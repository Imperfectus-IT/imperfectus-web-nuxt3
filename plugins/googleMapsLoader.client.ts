import { Loader } from '@googlemaps/js-api-loader'

let loaderInstance: Loader | null = null

export const getGoogleMapsLoader = (): Loader => {
  const config = useRuntimeConfig()
  const apiKey = config.public.GOOGLE_MAPS_API_KEY

  if (!loaderInstance) {
    loaderInstance = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    })
  }
  return loaderInstance
}

export default getGoogleMapsLoader
