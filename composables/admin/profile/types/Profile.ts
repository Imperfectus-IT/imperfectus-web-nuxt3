export type ProfileLanguage = {
  language: 'es' | 'ca'
}

export type ProfileLanguages = {
  name: string
  code: string
}

export type Profile = {
  company?: string
  email: string
  language: ProfileLanguage
  username: string
}
