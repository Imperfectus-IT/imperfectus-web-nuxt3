export default defineNuxtRouteMiddleware((to, from) => {
  const env = useRuntimeConfig()
  if (to.path.startsWith('/api')) {
    const newPath = to.path.replace(/^\/api/, '')
    return navigateTo(`${env.public.STRAPI_URL}${newPath}`, { external: true })
  }
})
