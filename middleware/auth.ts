export default defineNuxtRouteMiddleware((to, _from) => {
  console.log('AUTH!')
  const user = useStrapiUser()
  const localeRoute = useLocaleRoute()
  const route = localeRoute({ name: 'auth-login' })
  if (!user.value && route) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo(route.fullPath)
  }
})

// export default defineNuxtRouteMiddleware((to, _from) => {
//   console.log('to', to)
//   console.log('from', _from)
//   const user = useStrapiUser()
//   console.log('user', user)
//   const localeRoute = useLocaleRoute()
//   const route = localeRoute({ name: 'admin' })
//   if (!user.value && route) {
//     useCookie('redirect', { path: '/' }).value = to.fullPath
//     console.log('REDIRECT TO:', route.fullPath)
//     console.log(useCookie('redirect', { path: '/' }).value)
//     user.value = { email: 'wrong' }
//     return navigateTo(route.fullPath)
//   }
// })
