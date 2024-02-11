export default defineNuxtRouteMiddleware(() => {
  const user = useStrapiUser();
  const localeRoute = useLocaleRoute();
  const route = localeRoute({ name: "auth-login" });

  if (!user.value && route) {
    return navigateTo(route.fullPath);
  }
});
