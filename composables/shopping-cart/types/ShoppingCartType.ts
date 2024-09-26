export type MessageStatus = ERROR_MESSAGE_STATUS | SUCCESS_MESSAGE_STATUS | null

export type ValidationMessage = {
  status: MessageStatus
  message: string | null
}
