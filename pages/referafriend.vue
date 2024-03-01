<template>
  <div class=" border-t-[1px]">
   <Container>
    <div class="px-4 lg:flex lg:flex-row">
      <div class="flex flex-col gap-y-6 text-[20px] lg:text-[23px] lg:h-[90vh] justify-center lg:flex-1">
        <h4 class="mt-4 font-solina-extended-medium font-bold uppercase text-[16px] lg:text-[18px]">{{ t("layout.navbar.referrals") }}</h4>
        <h4 class="font-recoleta-regular text-[40px] leading-10 lg:text-[60px] lg:leading-[60px]">{{ t('pages.refer-a-friend.title') }}</h4>
        <p>{{ t("pages.refer-a-friend.main-description") }}</p>
        <p class="font-bold">{{ t('pages.refer-a-friend.main-description-2') }}</p>
        <p>{{ t('pages.refer-a-friend.main-description-3') }}</p>
        <NuxtLink
        :to="localePath('admin-referrals')"
        >
        <Button
        :pt="{
          root: 'bg-green-primary w-4/6 px-0 py-3 rounded-lg mt-5 lg:w-5/12 lg:px-2',
          label: 'font-solina-extended-medium'
        }" 
      :label="t('pages.refer-a-friend.goto')"
      raised 
      
      />
    </NuxtLink>
  </div>
    
  <NuxtImg
    loading="lazy"
    format="webp"
    src="/images/refer-a-friend/Tribu_Dark.webp" 
    alt="Refer a friend" 
    class="w-full lg:h-[90vh] object-fit lg:flex-1 mb-10 lg:mb-0" 
    />
  </div>
   </Container>
  <!-- DARK SECTION -->
  <div class="bg-green-tertiary" >
   <Container>
    <div class="flex flex-col gap-y-14  lg:flex-row lg:relative">
     <ListItem
      class="mt-14 ml-4 lg:absolute lg:left-1"
      :text="t('pages.refer-a-friend.how-it-works')"
      text-class="text-green-quaternary text-[30px] font-bold flex-1 w-full"
    />

    <ImageTextCard
      v-for="({ title, description, image }, index) in darkSection"
      :key="index"
      class="lg:mb-10 last:pb-10"
      :title="title"
      :description="description"
      :image="image"
      :container-class="'bg-green-tertiary text-green-quaternary text-center text-[20px] w-11/12 mx-auto'"
      :image-class="'w-full mb-8 lg:w-10/12 lg:mt-32'"
      >
      <template #text>
        <p class="font-bold">{{ title }}</p>
        <p class="mt-3 leading-6 p-2">{{ description }}</p>
      </template>
    </ImageTextCard>
      
    </div>
   </Container>
  </div>



    <!-- FAQS -->
    <Container>
    <h4 class="uppercase font-solina-condensed-bold font-bold mt-14 lg:ml-4 ml-4">{{ t('pages.refer-a-friend.faqs.title') }}</h4>
    <div class="px-4 lg:grid lg:grid-cols-2 lg:gap-x-6">
      <Fieldset
        v-for="({ question, answer, answerExt}, index) in faqs"
        :key="index"
        class="mt-6 whitespace-nowrap text-[20px] lg:text-[23px]" 
        :pt="{ legend: 'hidden' }"
      >
        <h4 class="font-bold pt-3 whitespace-normal">{{ question }}</h4>
        <p class="mt-4 p-1.5">
          {{ answer }}
        </p>
        <p v-if="answerExt" class="mt-4 p-1.5">
          {{ answerExt }}
        </p>
    </Fieldset>
    </div>
   </Container>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const localePath = useLocalePath();
const { t } = useI18n();


defineI18nRoute({
  paths: {
    ca: "/invita-a-un-amic/",
    es: "/invita-a-un-amigo/",
  },
});



const darkSection = computed(() => {
  return [
    {
      title: t('pages.refer-a-friend.how-it-works.title-1'),
      description: t('pages.refer-a-friend.how-it-works.description-1'),
      image: '/images/refer-a-friend/Tribu_Dark-1.webp'
    },
    {
      title: t('pages.refer-a-friend.how-it-works.title-2'),
      description: t('pages.refer-a-friend.how-it-works.description-2'),
      image: '/images/refer-a-friend/Tribu_Dark-2.webp'
    },
    {
      title: t('pages.refer-a-friend.how-it-works.title-3'),
      description: t('pages.refer-a-friend.how-it-works.description-3'),
      image: '/images/refer-a-friend/Tribu_Dark-3.webp'
    }
  ];
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
      answer: t('pages.refer-a-friend.faqs.description-5.p1'),
      answerExt: t('pages.refer-a-friend.faqs.description-5.p2')
    },
     {
      question: t('pages.refer-a-friend.faqs.title-6'),
      answer: t('pages.refer-a-friend.faqs.description-6'),
    }
  ];
});


</script>