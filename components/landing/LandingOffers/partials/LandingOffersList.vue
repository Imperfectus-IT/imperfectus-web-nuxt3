<template>
  <ul class="relative xl:bottom-10">
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
          class="text-[30px] ml-2 font-recoleta-regular "
          :class="currentOption !== $t(option.title) ? 'text-grey-secondary' : 'text-grey-primary'"
        >
          {{ $t(option.title) }}
        </h3>
      </div>

      <p
        v-if="currentOption === $t(option.title)"
        class="ml-4 lg:w-3/4"
      >
        {{ $t(option.description) }}
      </p>
    </li>
  </ul>
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