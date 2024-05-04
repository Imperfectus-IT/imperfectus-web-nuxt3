import { ref } from 'vue'

export const useStrapiLogin = () => {
  const loginFormData = ref({
    identifier: '',
    password: '',
  })

  const { login } = useStrapiAuth()

  const handleLogin = async () => {
    const data = {
      identifier: loginFormData.value.identifier,
      password: loginFormData.value.password,
    }

    await login(data)
  }

  return { loginFormData, handleLogin }
}
