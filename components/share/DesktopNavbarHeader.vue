<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

const { t } = useI18n()
const localePath = useLocalePath()
const { visible, toggleVisible } = useVisibleSidebar()
const router = useRouter()
const isOrderBuyRoute = computed(() => router.currentRoute.value.name === 'order___es' || router.currentRoute.value.name === 'order___ca')
const items = ref([
  {
    key: 'menu',
    label: t('layout.navbar.menu'),
    command: () => {
      toggleVisible()
    },
    visible: true,
  },
  {
    key: 'boxes_parent',
    label: t('layout.navbar.boxes'),
    icon: 'mdiChevronDown',
    items: [
      {
        key: 'boxes',
        label: t('layout.navbar.boxes.boxes'),
        url: localePath('boxes'),
      },
      {
        key: 'special',
        label: t('layout.navbar.boxes.special'),
        url: localePath('special'),
      },
    ],
  },
  {
    key: 'companies',
    label: t('layout.navbar.boxes.companies'),
    url: localePath('companies'),
  },
])
</script>

<template>
  <section>
    <Toolbar class="!p-0 bg-transparent border-none gap-x-2">
      <template #start>
        <Menubar class="h-16" :model="items">
          <template #item="{ item, props }">
            <NuxtLink
              :class="['flex items-center', isOrderBuyRoute && !item.visible ? 'invisible pointer-events-none' : 'visible cursor-pointer']"
              :to="item?.url"
              v-bind="props.action"
            >
              {{ item?.label }}
              <span
                v-if="item?.icon"
                class="mdi mdi-chevron-down text-[1.875rem]"
              />
            </NuxtLink>
          </template>
        </Menubar>
      </template>
      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark
            class="h-7"
            :font-controlled="false"
          />
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex items-center justify-center gap-x-5 pr-8">
          <NuxtLink
            :to="localePath({ name: 'order' })"
            :class="isOrderBuyRoute ? 'invisible pointer-events-none' : 'visible cursor-pointer'"
          >
            <Button
              :label="$t('homeTitle.order')"
              raised
            />
          </NuxtLink>
          <NuxtLink :to="localePath({ name: 'admin' })">
            <Button
              :label="$t('layout.navbar.account')"
              icon="mdi mdi-account"
              icon-pos="right"
              link
              :pt="{
                label: { class: 'font-solina-extended-medium font-normal' },
                icon: { class: 'text-lg ml-2 order-1' },
              }"
            />
          </NuxtLink>
          <TKLocalesSwitcher
            class="flex"
            :separator="true"
          />
        </div>
      </template>
    </Toolbar>
    <AppSidebar
      v-model:visible="visible"
      @hide="toggleVisible"
    />
  </section>
</template>
