export interface IFarmer {
  name: string
  description: string
  descriptionExtended?: string
  positionText: string
  images: Image[]
}

export interface Image {
  url: string
  width: number
  height: number
  class: string
}
