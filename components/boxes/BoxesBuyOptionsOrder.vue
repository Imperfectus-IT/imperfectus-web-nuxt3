<template>
  <Fieldset
    v-if="isDisplayDesktop"
    :pt="{ legend: 'hidden' }"
  >
    <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold lg:ml-0 lg:mt-3">
      {{ title }}
    </h4>
    <ul>
      <ListItem
        v-for="(item, index) in listItems"
        :key="index"
        main-class="flex gap-x-4"
        dot-class="text-[12px]"
        :text="$t(item)"
      />
    </ul>
  </Fieldset>

  <div v-else>
    <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold">
      {{ title }}
    </h4>
    <ul>
      <ListItem
        v-for="(item, index) in listItems"
        :key="index"
        main-class="flex gap-x-4"
        dot-class="text-[10px] mt-1"
        :text-class="`-ml-2 ${isBold(item)}`"
        :text="$t(item)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isDisplayDesktop: boolean
  listItems: string[]
  title: string
}>()
const isBold = (label: string) => label.includes('bold') ? 'font-bold' : ''
</script>
