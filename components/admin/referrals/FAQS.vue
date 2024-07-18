<template>
  <Panel>
    <h4 class="font-solina-extended-medium text-[22px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <div class="flex flex-row items-center justify-between text-[16px] p-4 border-[1px] rounded-lg mt-5">
      <p class="w-3/4">
        {{ $t(`${textData}question`) }}
      </p>
      <span
        :class="[getTogglerIcon, 'text-[32px]']"
        @click="toggleDisplayList"
      />
    </div>
    <ul
      v-if="isListDisplayed"
      class="w-11/12 mx-auto mt-5 text-[16px] lg:w-full"
    >
      <li class="text-[16px] leading-7 flex flex-row gap-3">
        <span class="mdi mdi-square text-[8px] mt-0" />
        <p>
          <span class="font-bold">{{ $t(`${textData}answer_1.title`) }}</span>
          <span>{{ $t(`${textData}answer_1.description`) }}</span>
        </p>
      </li>
      <li class="text-[16px] leading-7 flex flex-row gap-3 mt-2">
        <span class="mdi mdi-square text-[8px] mt-0" />
        <p>
          <span class="font-bold">{{ $t(`${textData}answer_2.title`) }}</span>
          <span>{{ $t(`${textData}answer_2.description`) }}</span>
        </p>
      </li>
    </ul>
  </Panel>
</template>

<script setup lang="ts">
const textData = 'referrals.faqs.'
const isListDisplayed = ref(false)
const getTogglerIcon = computed(() => (isListDisplayed.value ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'))
const toggleDisplayList = () => isListDisplayed.value = !isListDisplayed.value
</script>
