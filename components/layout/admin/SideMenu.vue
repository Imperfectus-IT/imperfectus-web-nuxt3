<template>
  <div
    class="lg:max-w-[22vw] border-[1px] border-green-ternary flex flex-col font-solina-extended-book text-[20px] p-6 rounded-xl"
  >
    <NuxtLink
      class="font-recoleta-regular text-[32px] mb-4"
      :to="localePath({ name: 'admin' })"
    >
      {{ $t("side_admin_menu.title") }}
    </NuxtLink>
    <NuxtLink
      v-for="item in mainMenu"
      :key="item.id"
      :to="getRouteTo(item)"
      class="pb-1 active:font-bold cursor-pointer flex flex-col"
      @click="hideTopNavbar"
    >{{ item.label }}
    </NuxtLink>
    <Divider />
    <NuxtLink
      v-for="item in secondaryMenu"
      :key="item.id"
      :to="getRouteTo(item)"
      class="pb-1 text-[1.125rem] cursor-pointer flex flex-col"
      @click="hideTopNavbar"
    >{{ item.label }}
    </NuxtLink>
    <NuxtLink
      class="pb-1 text-[1.125rem] cursor-pointer flex flex-col"
      @click.prevent="handleLogoutUser"
    >{{ $t('side_admin_menu.logout') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type LinkItem = {
  id: string
  label: string
  route?: string
  link?: string
}

const localePath = useLocalePath()
const { t } = useI18n()

const emit = defineEmits(['hide'])

const hideTopNavbar = () => {
  emit('hide')
}

const { handleLogoutUser } = useLogoutUserHandler()
const getRouteTo = (item: LinkItem) => item.route ? localePath({ name: item.route }) : item.link

const mainMenu: LinkItem[] = [
  {
    id: useId(),
    label: t('side_admin_menu.personal_data'),
    route: 'admin-profile',
  },
  {
    id: useId(),
    label: t('side_admin_menu.orders'),
    route: 'admin-orders',
  },
  {
    id: useId(),
    label: t('side_admin_menu.subscriptions'),
    route: 'admin-subscriptions',
  },
  {
    id: useId(),
    label: t('side_admin_menu.referrals'),
    route: 'admin-referrals',
  },
  {
    id: useId(),
    label: t('side_admin_menu.giftcard'),
    route: 'admin-gift-cards',
  },
  {
    id: useId(),
    label: t('side_admin_menu.newsletter'),
    route: 'admin-newsletter',
  },
]

const secondaryMenu: LinkItem[] = [
  {
    id: useId(),
    label: t('side_admin_menu.faq'),
    link: 'https://help.talkualfoods.com/knowledge',
  },
  {
    id: useId(),
    label: t('side_admin_menu.contact'),
    route: 'contact',
  },
]
</script>
