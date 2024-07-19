export const useGetUserHandler = () => {
  const { executeGetUser } = useGetUser()
  const { user } = useUserState()
  // const getUserHandler = async () => {
  //   await executeGetUser()
  // }
  return {
    user,
    // getUserHandler,
  }
}
