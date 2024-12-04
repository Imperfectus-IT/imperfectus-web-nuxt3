import getGoogleMapsLoader from '~/plugins/googleMapsLoader.client.ts'

export const useGoogleMaps = () => {
  const loadGoogleMaps = async (): Promise<google.maps.MapsLibrary> => {
    const loader = getGoogleMapsLoader()
    try {
      return await loader.importLibrary('maps')
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
