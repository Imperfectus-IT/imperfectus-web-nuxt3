<template>
  <ul>
    <li
      v-for="(option, index) in options"
      :key="index"
      class="p-2"
      :pt="{
        hr: 'display-none'
      }"
      @click="currentOption = $t(option.title)"
    >
      <div class="flex items-center">
        <div
          v-if="currentOption === $t(option.title)"
          class="bg-green-primary w-4 h-4 rounded-xl ml-4"
        />

        <h3
          class="text-[30px] ml-2 font-recoleta"
          :class="currentOption !== $t(option.title) ? 'text-grey-primary' : '!text-grey-secondary'"
        >
          {{ $t(option.title) }}
        </h3>
      </div>

      <p
        v-if="currentOption === $t(option.title)"
        class="ml-4"
      >
        {{ $t(option.description) }}
      </p>
    </li>
  </ul>
  <div class="bg-green-tertiary text-green-quaternary text-[35px] p-8 leading-[43px]">
    <p class="inline">
      {{ $t('boxes.suppliers.description.1') }}
    </p>
    <p class="font-recoleta text-green-primary text-[38px] inline">
      {{ $t('boxes.suppliers.description.2.bold') }}
    </p>
    <p class="inline">
      {{ $t('boxes.suppliers.description.3') }}
    </p>
    <p class="inline font-recoleta text-green-primary text-[38px]">
      {{ $t('boxes.suppliers.description.4.bold') }}
    </p>
    <p class="inline">
      {{ $t('boxes.suppliers.description.5') }}
    </p>
    <p class="inline font-recoleta text-green-primary text-[38px]">
      {{ $t('boxes.suppliers.description.6.bold') }}
    </p>
    <div class="flex flex-row items-center mt-4">
      <div class="h-3 w-3 bg-green-primary rounded-xl mr-2" />
      <NuxtLink
        to="boxes"
        class="text-[16px]"
      >
        <p>{{ $t('homeKnowMore.more') }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const currentOption = ref(t('homeOffer.comfortable.title'));
const options = [
        {
          title: 'homeOffer.comfortable.title',
          description: 'homeOffer.comfortable.description'
        },
        {
          title: 'homeOffer.fresh.title',
          description: 'homeOffer.fresh.title.description'
        },
        {
          title: 'homeOffer.noCommitment.title',
          description: 'homeOffer.noCommitment.description'
        }
      ];

</script>