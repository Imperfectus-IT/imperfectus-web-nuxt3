<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const { t } = useI18n()
const localePath = useLocalePath()

const { visible } = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'hide'): void
}>()

const closeSidebar = () => {
  emit('hide')
}

const hasCollapse = (item: MenuItem) => {
  if (!item.items) {
    closeSidebar()
  }
}

const getParentItem = (itemId: string) => {
  return itemLinks.find(item =>
    item.items?.some(subItem => subItem.id === itemId),
  )
}

const itemLinks = [
  {
    id: useId(),
    icon: 'mdi mdi-arrow-top-right-thick',
    label: t('layout.navbar.boxes'),
    items: [
      {
        id: useId(),
        label: t('layout.navbar.boxes.boxes'),
        path: localePath('boxes'),
      },
      {
        id: useId(),
        label: t('layout.navbar.boxes.special'),
        path: localePath('special'),
      },
    ],
  },
  {
    id: useId(),
    label: t('layout.navbar.whatinbox'),
    path: localePath('whatinbox'),
  },
  {
    id: useId(),
    label: t('layout.navbar.fruitsForCompanies'),
    path: localePath('companies'),
  },
  {
    id: useId(),
    label: t('layout.navbar.referrals'),
    path: localePath('referafriend'),
  },
  {
    id: useId(),
    label: t('layout.navbar.giftcards'),
    path: localePath('gift-card-gift-card-create'),
  },
  {
    id: useId(),
    label: t('layout.navbar.about'),
    items: [
      {
        id: useId(),
        label: t('layout.navbar.history'),
        path: localePath('about'),
      },
      {
        id: useId(),
        label: t('layout.navbar.farmers'),
        path: localePath('farmers'),
      },
      {
        id: useId(),
        label: t('layout.navbar.team'),
        path: localePath('team'),
      },
      {
        id: useId(),
        label: t('layout.navbar.newsroom'),
        path: localePath('newsroom'),
      },
      {
        id: useId(),
        label: t('layout.navbar.contact'),
        path: localePath('contact'),
      },
      {
        id: useId(),
        label: t('layout.navbar.faqs.title'),
        path: t('layout.navbar.faqs.url'),
      },
    ],
  },
  {
    id: useId(),
    label: t('layout.navbar.blog.title'),
    path: t('layout.navbar.blog.url'),
  },
]
const selectedItem = ref<string | null>(null)
const selectItem = (item: MenuItem) => {
  selectedItem.value = getParentItem(item.id)?.id || item.id
}
</script>

<template>
  <Sidebar :visible="visible">
    <template #closeicon>
      <span
        class="mdi mdi-close text-2xl"
        @click.prevent="closeSidebar"
      />
    </template>
    <PanelMenu :model="itemLinks">
      <template #item="{ item }">
        <div @click="hasCollapse(item)">
          <NuxtLink :to="item.path">
            <div class="flex flex-row">
              <span
                v-if="selectedItem === item.id"
                class="text-green-primary !text-[12px] mr-3"
              >⬤</span>
              <span @click="selectItem(item)">{{ item.label }}</span>
              <span
                v-if="item.items"
                class="mdi mdi-arrow-down ml-2"
              />
            </div>
          </NuxtLink>
        </div>
      </template>
    </PanelMenu>
    <TKLocalesSwitcher
      :separator="true"
      class="mt-10 !font-medium"
    />
  </Sidebar>
</template>
