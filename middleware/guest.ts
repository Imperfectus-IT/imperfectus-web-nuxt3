export default defineNuxtRouteMiddleware(() => {
  const user = useStrapiUser();
  const localeRoute = useLocaleRoute();
  const route = localeRoute({ name: "index" });

  if (user.value && route) {
    useCookie("redirect", { path: "/" }).value = route.fullPath;
    return navigateTo(route.fullPath);
  }
});
