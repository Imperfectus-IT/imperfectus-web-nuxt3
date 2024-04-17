<template>
  <div>
    <ContactForm />

    <div class="lg:w-1/2 lg:mx-auto">
      <div v-for="(contact, index) in contacts" :key="index">
        <ContactField
          :title="contact.title"
          :email="contact.email"
          :phone="contact.phone"
        />
      </div>

      <div class="w-11/12 mx-auto leading-10 mb-6">
        <h4 class="font-solina-extended-medium uppercase">
          {{ t("string.misc.contact.address") }}
        </h4>
        <p class="font-recoleta-regular text-[22px]">
          Av. Lleida 32, Bellpuig (25250)
        </p>
      </div>

      <ScheduleTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const contacts = computed(() => {
  return [
    {
      title: t("string.misc.contact.general"),
      email: "info@talkualfoods.com",
      phone: "+34 722 19 74 52",
    },
    {
      title: t("string.misc.contact.companies"),
      email: "empresa@talkualfoods.com",
      phone: "+34 623 40 35 40",
    },
  ];
});
</script>
