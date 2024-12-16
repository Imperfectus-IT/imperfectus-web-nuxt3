export const useUnsubscribeFromNewsletter = () => {
  const { unsubscribeFromNewsletter, getUser } = useUserRepository()
  const { user } = useUserState()
  const executeUnsubscribeFromNewsletter = async (myUser: User) => {
    await unsubscribeFromNewsletter(myUser)
    user.value = await getUser()
  }

  return {
    executeUnsubscribeFromNewsletter,
  }
}
