<template>
  <h4 class="uppercase font-bold font-solina-extended-medium text-[22px] ml-8 my-8">
    {{ $t("gift-card-doubts.title") }}
  </h4>
  <div
    v-for="item in textData.items"
    :key="item"
  >
    <Divider class="text-green-primary !w-10/12 mx-auto lg:!w-[97vw]" />
    <Panel
      class="mb-4"
      :pt="{
        header: 'flex flex-row justify-between px-8',
        title: 'text-[16px] font-bold w-10/12',
        root: '',
        content: 'px-6 mt-2',
      }"
      toggleable
      :collapsed="true"
      :header="$t(`${textData.section}${item}.question`)"
    >
      <p class="ml-5">
        {{ $t(`${textData.section}${item}.answer`) }}
      </p>
    </Panel>
  </div>
</template>

<script setup lang="ts">
const textData = {
  items: 4,
  section: 'gift-card.doubts.',
}
</script>
