export default defineNuxtRouteMiddleware((to, from) => {
  const env = useRuntimeConfig()
  if (to.path.startsWith('/api')) {
    const newPath = to.fullPath.replace(/^\/api/, '')
    return navigateTo(`${env.STRAPI_URL}${newPath}`, { external: true })
  }
})
