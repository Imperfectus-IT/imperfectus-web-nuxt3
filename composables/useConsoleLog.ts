export const useConsoleLog = () => {
  const NODE_ENV_PRODUCTION = 'production'
  const logError = (message?: any, ...optionalParams: any[]) => {
    if (useRuntimeConfig().public.NODE_ENV !== NODE_ENV_PRODUCTION) {
      console.error(message, ...optionalParams)
    }
  }
  const logInfo = (message?: any, ...optionalParams: any[]) => {
    if (useRuntimeConfig().public.NODE_ENV !== NODE_ENV_PRODUCTION) {
      console.log(message, ...optionalParams)
    }
  }
  return {
    logError,
    logInfo,
  }
}
