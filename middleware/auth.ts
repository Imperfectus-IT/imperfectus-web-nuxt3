export default defineNuxtRouteMiddleware((to, _from) => {
  console.log('to', to)
  console.log('from', _from)
  const user = useStrapiUser()
  console.log('user', user)
  const localeRoute = useLocaleRoute()
  const route = localeRoute({ name: 'admin' })
  if (!user.value && route) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    console.log('REDIRECT TO:', route.fullPath)
    console.log(useCookie('redirect', { path: '/' }).value)
    return navigateTo(route.fullPath)
  }
})
