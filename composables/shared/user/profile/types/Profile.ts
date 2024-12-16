export type ProfileLanguage = {
  language: 'es' | 'ca' | 'pt'
}

export type ProfileLanguages = {
  name: string
  code: string
}

export interface PersonalData {
  username: string
  email: string
}

export type Profile = {
  id: number
  company?: string
  email: string
  language: ProfileLanguage
  username: string
}
