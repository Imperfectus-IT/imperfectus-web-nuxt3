
<template>
  <div class="flex justify-center p-5 bg-green-tertiary">
    <PanelMenu :model="items">
      <template #item="{ item }">
        <NuxtLink v-if="item.route" :to="item.route">
          {{ item.label }}
        </NuxtLink>
        <a v-else v-ripple :href="item.url" :target="item.target">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="item.items" class="mdi mdi-arrow-down ml-2" />
        </a>
      </template>
    </PanelMenu>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    label: 'Router',
    icon: 'mdi mdi-account',
    items: [
      {
        label: 'Styled',
        icon: 'mdi mdi-arrow-top-right-thick',
        route: '/theming'
      },
      {
        label: 'Unstyled',
        icon: 'pi pi-heart',
        route: '/unstyled'
      }
    ]
  },
  {
    label: 'Programmatic',
    icon: 'pi pi-link',
    command: () => {
      router.push('/introduction');
    }
  },
  {
    label: 'External',
    icon: 'mdi mdi-arrow-top-right-thick',
    items: [
      {
        label: 'Vue.js',
        icon: 'mdi mdi-arrow-top-right-thick',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Vite.js',
        icon: 'pi pi-bookmark',
        url: 'https://vuejs.org/'
      }
    ]
  }
]);
</script>
