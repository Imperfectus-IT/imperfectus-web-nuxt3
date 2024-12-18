export const useStrapiMetricsRepository = (): MetricsRepository => {
  const client = useStrapiClient()
  const getMetrics = async (): Promise<ImpactMetrics> => {
    const strapiMetrics: StrapiMetrics = await client('/utils/metrics')
    return Promise.resolve(useImpactMetricsFactory(strapiMetrics))
  }

  return {
    getMetrics,
  }
}
