export const useLogoutUser = () => {
  const executeLogoutUser = (): void => {
    const { logout } = useAuthRepository()
    logout()
  }

  return { executeLogoutUser }
}
