export const useUpdateUser = () => {
  const { subscribeToNewsletter, unsubscribeFromNewsletter, getUser } = useUserRepository()
  const { user } = useUserState()
  const executeSubscribeToNewsletter = async (myUser: User) => {
    await subscribeToNewsletter(myUser)
    user.value = await getUser()
  }
  const executeUnsubscribeFromNewsletter = async (myUser: User) => {
    await unsubscribeFromNewsletter(myUser)
    user.value = await getUser()
  }

  return {
    executeSubscribeToNewsletter,
    executeUnsubscribeFromNewsletter,
  }
}
