<template>
  <div class=" border-t-[1px] px-4">

   <div class="flex flex-col gap-y-6 text-[20px]">
     <h4 class="mt-4 font-solina-extended-medium font-bold uppercase text-[16px]">{{ t("layout.navbar.referrals") }}</h4>
    <h4 class="font-recoleta-regular text-[40px] leading-10">{{ t('pages.refer-a-friend.title') }}</h4>
    <p>{{ t("pages.refer-a-friend.main-description") }}</p>
    <p class="font-bold">{{ t('pages.refer-a-friend.main-description-2') }}</p>
    <p>{{ t('pages.refer-a-friend.main-description-3') }}</p>
    <Button
      :pt="{
        root: 'bg-green-primary w-4/6 px-6 py-3 rounded-lg',
        label: 'font-solina-extended-medium'
      }" :label="t('pages.refer-a-friend.goto')" raised />
   
  <NuxtImg
    loading="lazy"
    format="webp"
    src="/images/refer-a-friend/Tribu_Dark.png" 
    alt="Refer a friend" 
    class="w-full" 
    />
  </div>

  <!-- DARK SECTION -->
  <div class="bg-green-tertiary">

  </div>



    <!-- FAQS -->
    <Fieldset
      v-for="({ question, answer}, index) in faqs"
      :key="index"
      class="mt-6 " 
      :pt="{ legend: 'hidden' }"
    >
      <h4 class="text-[20px] font-bold pt-3">{{ question }}</h4>
      <p class="text-[20px] mt-4 p-1.5">
        {{ answer }}
      </p>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/invita-a-un-amic/",
    es: "/invita-a-un-amigo/",
  },
});

const faqs = computed(() => {
  return [
    {
      question: t('pages.refer-a-friend.faqs.title-1'),
      answer: t('pages.refer-a-friend.faqs.description-1'),
    },
    {
      question: t('pages.refer-a-friend.faqs.title-2'),
      answer: t('pages.refer-a-friend.faqs.description-2'),
    },
    {
      question: t('pages.refer-a-friend.faqs.title-3'),
      answer: t('pages.refer-a-friend.faqs.description-3'),
    },
    {
      question: t('pages.refer-a-friend.faqs.title-4'),
      answer: t('pages.refer-a-friend.faqs.description-4'),
    },
     {
      question: t('pages.refer-a-friend.faqs.title-5'),
      answer: t('pages.refer-a-friend.faqs.description-5'),
    },
     {
      question: t('pages.refer-a-friend.faqs.title-6'),
      answer: t('pages.refer-a-friend.faqs.description-6'),
    }
  ];
});


</script>