export const ALL_COVERAGES: AllCoverages = {
  PAACK: {
    label: 'Paack',
    value: 'paack',
  },
  MENSAKAS: {
    label: 'Mensakas',
    value: 'mensakas',
  },
  CORREOSEXPRESS: {
    label: 'Correos Express',
    value: 'correosexp',
  },
  SEUR: {
    label: 'SEUR (Puntos de recogida)',
    value: 'seur',
  },
  TALKUAL: {
    label: 'Talkual',
    value: 'talkual',
  },
}

export type CoverageOption = {
  label: string
  value: string
}

type AllCoverages = {
  PAACK: CoverageOption
  MENSAKAS: CoverageOption
  CORREOSEXPRESS: CoverageOption
  SEUR: CoverageOption
  TALKUAL: CoverageOption
}
