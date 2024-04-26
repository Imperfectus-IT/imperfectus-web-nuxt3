export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useStrapiUser();
  const localeRoute = useLocaleRoute();
  const route = localeRoute({ name: "auth-login" });

  if (!user.value && route) {
    useCookie('redirect', { path: '/' }).value = to.fullPath;
    return navigateTo(route.fullPath);
  }
});
