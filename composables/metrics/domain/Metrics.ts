export type ImpactMetrics = {
  totalRescuedKgs: number
  bagsAvoided: number
  co2Emitted: number
  waterLitersRecovered: number
  farmersCollaborating: number
  peopleWithBoxRecieved: number
}

export const createEmpty = (): ImpactMetrics => {
  return {
    totalRescuedKgs: 0,
    bagsAvoided: 0,
    co2Emitted: 0,
    waterLitersRecovered: 0,
    farmersCollaborating: 0,
    peopleWithBoxRecieved: 0,
  }
}
