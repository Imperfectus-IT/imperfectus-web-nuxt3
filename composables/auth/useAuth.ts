export const useAuth = () => {
    const REGISTER_EVENT = 'register'
    const LOGIN_EVENT = 'login'
    const handleLoginEvent = () => {
        const localeRoute = useLocaleRoute()
        const route = localeRoute({ name: 'admin' })
        navigateTo(route.fullPath)
    }

    const handleRegisterEvent = () => {
        const localeRoute = useLocaleRoute()
        const route = localeRoute({ name: 'admin' })
        navigateTo(route.fullPath)
    }
    const componentRender = ref('login')
    const loadComponent = (event: any) => {
        componentRender.value = event
    }
    return {
        REGISTER_EVENT,
        LOGIN_EVENT,
        componentRender,
        loadComponent,
        handleLoginEvent,
        handleRegisterEvent
    }
}
