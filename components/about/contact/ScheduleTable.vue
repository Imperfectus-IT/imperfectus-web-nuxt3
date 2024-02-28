<template>
  <div class="font-recoleta-regular text-[22px] w-11/12 mx-auto">
    <h4>{{ t('pages.contact.form.schedule') }}</h4>
    <div
      v-for="(item, index) in schedule"
      :key="index"
      class="flex justify-between leading-10"
    >
    <span>{{ item.name }}</span>
    <span>{{ item.hours }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const schedule = computed(() => {
      return [
        {
          name: t('pages.contact.customerSchedule.monday'),
          hours: '9:00 - 19:30'
        },
        {
          name: t('pages.contact.customerSchedule.tuesday'),
          hours: '9:00 - 21:00'
        },
        {
          name: t('pages.contact.customerSchedule.wednesday'),
          hours: '9:00 - 21:00'
        },
        {
          name: t('pages.contact.customerSchedule.thursday'),
          hours: '9:00 - 21:00'
        },
        {
          name: t('pages.contact.customerSchedule.friday'),
          hours: '9:00 - 21:00'
        }
      ]
})
</script>
