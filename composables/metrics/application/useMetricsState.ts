import { createEmpty as createEmptyMetrics } from '@/composables/metrics/domain/Metrics.ts'

export const useMetricsState = () => {
  const impactMetrics: Ref<ImpactMetrics> = useState('impactMetrics', () => createEmptyMetrics())
  return {
    impactMetrics,
  }
}
