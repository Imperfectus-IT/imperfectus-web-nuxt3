export type MetricsRepository = {
  getMetrics: () => Promise<ImpactMetrics>
}
