import { useUserRepository } from '~/composables/shared/user/infrastructure/useUserRepository.ts'

export const useUpdatePassword = () => {
  const updatePassword = async (oldPassword: string, password: string, newPassword: string, email: string): Promise<void> => {
    const { updatePassword: modifyPassword } = useUserRepository()
    return modifyPassword(oldPassword, password, newPassword, email)
  }

  return { updatePassword }
}
