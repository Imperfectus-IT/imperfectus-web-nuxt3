<script setup lang="ts">
import { onMounted } from "vue";

const client = useStrapiClient();
const { redirectPaths } = useRedirectPaths();
const { redirectProvider, redirectToAction } = useRedirectProvider();

const googleCallback = async () => {
  return await client("/auth/google/callback", {
    method: "GET",
    query: { access_token: route.query.access_token },
  });
};

onMounted(async () => {
  const { jwt } = await googleCallback();
  const { authenticateProvider } = useStrapiAuth();
  await authenticateProvider("google", jwt);

  if (redirectProvider) {
    redirectToAction(redirectProvider.value);
    return;
  }

  redirectToAction(redirectPaths.ADMIN);
});
</script>
<template></template>
