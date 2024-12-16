export const useGetUser = () => {
  const { getUser } = useUserRepository()
  const { user } = useUserState()
  const executeGetUser = async () => {
    user.value = await getUser()
  }
  return {
    executeGetUser,
  }
}
