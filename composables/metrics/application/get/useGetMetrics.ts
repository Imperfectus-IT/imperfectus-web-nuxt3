import { useMetricsState } from '~/composables/metrics/application/useMetricsState.ts'

export const useGetMetrics = () => {
  const { getMetrics } = useStrapiMetricsRepository()
  const { impactMetrics } = useMetricsState()

  const executeGetMetrics = async () => {
    try {
      impactMetrics.value = await getMetrics()
    }
    catch (e) {
      console.error(e)
    }
  }

  return {
    executeGetMetrics,
    impactMetrics,
  }
}
