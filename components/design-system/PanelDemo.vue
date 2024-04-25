<script setup lang="ts">
const collapsed = ref(false);

const toggleIcons = computed(() => {
  return collapsed.value ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down";
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Panel>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Panel>
    <Panel header="Header">
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Panel>
    <Panel header="Header" toggleable>
      <template #togglericon>
        <span class="mdi mdi-chevron-down"></span>
      </template>
      <p class="py-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Panel>
    <Panel toggleable @update:collapsed="collapsed = $event">
      <template #header>
        <div class="flex flex-col gap-3 w-full px-3 py-2">
          <h3 class="solina-extended-book text-base lg:text-lg font-semibold leading-5">Header</h3>
          <Divider class="!m-0"/>
        </div>
      </template>
      <template #togglericon>
        <span :class="[toggleIcons]"/>
      </template>
      <p class="py-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Panel>
  </div>
</template>
