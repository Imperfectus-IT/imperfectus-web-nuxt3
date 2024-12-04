import getGoogleMapsLoader from '~/plugins/googleMapsLoader.client.ts'

export const useGoogleMaps = () => {
  const loadGoogleMaps = async (): Promise<typeof google> => {
    const loader = getGoogleMapsLoader()
    try {
      return await loader.load()
    }
    catch (error) {
      console.error('Error loading Google Maps:', error)
      throw error
    }
  }

  return {
    loadGoogleMaps,
  }
}
