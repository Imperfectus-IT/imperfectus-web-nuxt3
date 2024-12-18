export default defineNuxtRouteMiddleware((to, from) => {
  // Check if the URL starts with `/api`
  if (to.path.startsWith('/api')) {
    // Construct the new path by removing `/api`
    const newPath = to.path.replace(/^\/api/, '')

    // Redirect to the backend URL
    return navigateTo(`http://localhost:3000${newPath}`, { external: true })
  }
})
