export interface StatusesObject {
  [key: number]: string
}

export interface Event {
  status: string
  background: string
  icon: string
  border: string
}

export interface OneStepEvents {
  replaced: Event
  refunded: Event
  other: Event
}
