<template>
  <div>
    <ContactForm />
    <div 
    v-for="(contact, index) in contacts"
    :key="index"
    >
      <ContactField :title="contact.title" :email="contact.email" :phone="contact.phone" />
    </div>
    <div>
      <h4>{{ t('string.misc.contact.address') }}</h4>
    </div>
  <ScheduleTable />

  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const contacts = computed(() => {
  return [
    {
      title: t('string.misc.contact.general'),
      email: 'info@talkualfoods.com',
      phone: '+34 722 19 74 52'
    },
    {
      title: t('string.misc.contact.companies'),
      email: 'empresa@talkualfoods.com',
      phone: '+34 623 40 35 40'
    }
  ]
})

</script>
