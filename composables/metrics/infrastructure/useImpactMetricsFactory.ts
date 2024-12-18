export const useImpactMetricsFactory = (metrics: StrapiMetrics): ImpactMetrics => {
  return {
    totalRescuedKgs: metrics.kgRescued.value,
    bagsAvoided: metrics.numberBags.value,
    co2Emitted: metrics.kgEmitted.value,
    waterLitersRecovered: metrics.litersWaterWasted.value,
    farmersCollaborating: metrics.collaboratedFarmers.value,
    peopleWithBoxRecieved: metrics.numberPeopleReceivedBox.value,
  }
}
