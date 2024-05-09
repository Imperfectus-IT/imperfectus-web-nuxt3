export const useLogoutUserHandler = () => {
    const { executeLogoutUser } = useLogoutUser()

    const handleLogoutUser = (): void => {
        executeLogoutUser()
        navigateTo('/')
    }

    return { handleLogoutUser }
}
