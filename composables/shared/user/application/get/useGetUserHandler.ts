import { useUserState } from '~/composables/shared/user/application/useUserState.ts'

export const useGetUserHandler = () => {
  const { executeGetUser } = useGetUser()
  const { user } = useUserState()
  onMounted(async () => {
    await executeGetUser()
  })

  return {
    user,
  }
}
