export const useLogoutUser = () => {
  const executeLogoutUser = (): void => {
    const { logout } = useAuthStrapiRepository()
    logout()
  }

  return { executeLogoutUser }
}
