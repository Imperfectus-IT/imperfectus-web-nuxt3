<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

const localePath = useLocalePath()
const { visible, toggleVisible } = useVisibleSidebar()
const router = useRouter()
const routeToHidde = {
  'auth-login___es': true,
  'auth-login___ca': true,
}
const hiddeAccountLink = computed(() => routeToHidde[router.currentRoute.value.name as string] ?? false)
</script>

<template>
  <section>
    <Toolbar class="!p-0 bg-transparent border-none">
      <template #start>
        <Button
          icon="mdi mdi-menu"
          text
          raised
          aria-label="Menu"
          :pt="{ icon: 'text-xl' }"
          @click="toggleVisible"
        />
      </template>

      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark
            class="w-[156] h-7"
            :font-controlled="false"
          />
        </NuxtLink>
      </template>

      <template #end>
        <NuxtLink
          :class="{ invisible: hiddeAccountLink }"
          :to="localePath({ name: 'admin' })"
        >
          <Button
            icon="mdi mdi-account"
            text
            raised
            aria-label="Account"
            :pt="{ icon: 'text-xl' }"
          />
        </NuxtLink>
      </template>
    </Toolbar>
    <AppSidebar
      v-model:visible="visible"
      @hide="toggleVisible"
    />
  </section>
</template>

<style scoped lang="scss"></style>
