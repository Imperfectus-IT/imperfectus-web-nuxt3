<template>
  <Fieldset
    v-if="isDisplayDesktop"
    :pt="{ legend: 'hidden' }"
  >
    <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold lg:ml-0 lg:mt-6">
      {{ title }}
    </h4>
    <ul>
      <li
        v-for="(item, index) in listItems"
        :key="index"
      >
        <ListItem
          main-class="flex gap-x-4"
          dot-class="text-[12px]"
          text-class="-ml-2"
          :text="t(item)"
        />
      </li>
    </ul>
  </Fieldset>

  <div v-else>
    <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold">
      {{ title }}
    </h4>
    <ul>
      <li
        v-for="(item, index) in listItems"
        :key="index"
      >
        <ListItem
          main-class="flex gap-x-4"
          dot-class="text-[10px] mt-1"
          text-class=""
          :text="t(item)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  isDisplayDesktop: boolean
  listItems: string[]
  title: string
}>()

const { t } = useI18n()
</script>
