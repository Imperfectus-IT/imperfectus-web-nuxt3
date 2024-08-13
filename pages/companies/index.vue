<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineI18nRoute({
  paths: {
    ca: '/empreses/',
    es: '/empresas/',
  },
})

const { t } = useI18n()
const i18nHead = useLocaleHead()

useHead({
  title: t('pages.companies.title'),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('pages.companies.description'),
    },
    ...i18nHead.value.meta,
  ],
})

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

const contact = {
  title: t('string.misc.contact.companies'),
  email: 'empresa@talkualfoods.com',
  phone: '+34 623 40 35 40',
}

const pdfFilePath = computed(() => {
  return `/pdfs/${t('pages.companies.pdfFileName')}`
})
</script>

<template>
  <div class="font-serif flex flex-col">
    <Header
      :title="
        $t('companies.wantBeHealthy.1') + '\n' + $t('companies.wantBeHealthy.2')
      "
      class="h-[222px]   lg:mt-0"
      background-desktop="/images/companies/header.webp"
    >
      <template #action>
        <Button
          class="mt-5 font-solina-extended-book"
          :pt="{
            label: 'text-[12px] lg:text-[16px]',
          }"
          :label="$t('companies.getYourFreeBox')"
          @click="scrollToSection('hubspot-form')"
        />
      </template>
    </Header>

    <Container
      :is-full="true"
      class="flex flex-col gap-0 pr-4 pb-12 pl-4 lg:flex-row lg:gap-12 lg:px-44"
    >
      <div
        class="flex flex-col items-center text-lg lg:mt-[5px] lg:text-xl lg:grid lg:grid-cols-3 lg:gap-y-8"
      >
        <SectionTitle
          :is-title-h1="true"
          :value="$t('companies.mission')"
          class="mt-12 lg:row-start-1 lg:col-start-1 lg:col-span-3 lg:ml-0"
          title-class="mb-4 font-solina-extended-medium"
        />

        <p
          class="h-full mb-[35px] font-recoleta-regular text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px] lg:row-start-2 lg:col-span-2 lg:mb-0"
        >
          {{ $t("companies.description") }}
        </p>

        <InfoCard
          class="mb-5 lg:row-start-3 lg:col-start-1 lg:mb-0 lg:mr-12 lg:p-10"
          :title="$t('companies.mission.1.title')"
          :description="$t('companies.mission.1.description')"
        />

        <InfoCard
          class="lg:row-start-3 lg:col-start-2 lg:mr-12 lg:p-10"
          :title="$t('companies.mission.2.title')"
          :description="$t('companies.mission.2.description')"
        />

        <NuxtImg
          class="mt-5 w-[290px] lg:w-[350px] lg:row-start-1 lg:col-start-3 lg:row-span-4"
          width="290"
          src="/images/companies/no-waste.webp"
          alt="No waste"
        />

        <p class="mt-5 lg:text-[28px] font-recoleta-regular lg:col-span-2">
          {{ $t("companies.mission.join") }}
        </p>
      </div>
    </Container>

    <div
      class="flex flex-col items-center pt-14 pr-4 pb-10 pl-4 bg-green-tertiary text-green-quaternary md:grid md:grid-cols-2 md:gap-x-5 md:px-10 md:py-20"
    >
      <div class="flex justify-center md:row-start-1 md:row-end-3">
        <NuxtImg
          class="object-scale-down h-[200px] md:h-[300px]"
          format="webp"
          loading="lazy"
          src="/images/companies/make-order.webp"
          :alt="$t('Companies.1.alt')"
        />
      </div>

      <span
        class="mt-8 pr-2 pl-2 text-lg leading-[1.35] font-recoleta-regular md:text-[40px] md:mt-0 md:pr-0 md:text-left"
      >
        {{ $t("companies.whatYouGet.title") }}
      </span>

      <ul
        class="mt-8 mr-0 text-beige-primary md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3"
      >
        <li class="mb-4">
          <ListItem
            :text="$t('companies.whatYouGet.1')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>

        <li class="mb-4">
          <ListItem
            :text="$t('companies.whatYouGet.2')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>

        <li class="mb-4">
          <ListItem
            :text="$t('companies.whatYouGet.3')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>

        <li>
          <ListItem
            :text="$t('companies.whatYouGet.4')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>
      </ul>
    </div>

    <div class="mt-0 mr-0 mb-0 ml-0 flex flex-col pt-6 pr-4 pb-6 pl-4 md:pl-[50px] md:pr-[50px] md:grid md:grid-cols-2 md:grid-rows-4 md:content-center md:gap-y-5 md:pt-20 md:pb-20">
      <SectionTitle
        :value="$t('companies.whoItWorks.title')"
        class="mb-2 md:mb-0"
        title-class="mb-4 text-lg md:text-[40px] md:mb-0"
      />

      <ListItem
        :text="$t('companies.whoItWorks.1')"
        class="gap-x-2 md:col-start-1"
        text-class="flex-1 text-base font-solina-extended-book lg:text-[20px]"
      />

      <div class="mt-5 flex flex-wrap gap-4 lg:my-auto">
        <InfoCard
          :title="$t('string.day.tuesday')"
          class="flex-1 min-w-[calc(33.33%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-h-[50px]"
        />
        <InfoCard
          :title="$t('string.day.wednesday')"
          class="flex-1 min-w-[calc(33.33%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-h-[50px]"
        />
        <InfoCard
          :title="$t('string.day.thursday')"
          class="flex-1 min-w-[calc(33.33%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-h-[50px]"
        />
        <InfoCard
          :title="$t('string.day.friday')"
          class=" min-w-[calc(33%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-h-[50px]"
        />
      </div>

      <ListItem
        :text="$t('companies.frequency.title')"
        class="mt-6 gap-x-2 md:mt-0"
        text-class="flex-1 text-base font-solina-extended-book lg:text-[20px]"
      />

      <div
        class="mt-5 flex flex-wrap gap-4 md:col-start-2 md:row-start-3 md:m-0"
      >
        <InfoCard
          :title="$t('companies.frequency.weekly')"
          class=" min-w-[calc(45%-1rem)] lg:min-w-[calc(33%-1rem)]"
        />
        <InfoCard
          :title="$t('companies.frequency.biweekly')"
          class=" min-w-[calc(45%-1rem)] lg:min-w-[calc(33%-1rem)]"
        />
        <InfoCard
          :title="$t('companies.frequency.once')"
          class=" min-w-[calc(45%-1rem)] lg:min-w-[calc(33%-1rem)]"
        />
      </div>

      <ListItem
        :text="$t('companies.size')"
        class="mt-6 gap-x-2 md:mt-0"
        text-class="flex-1 text-base font-solina-extended-book lg:text-[20px]"
        image-class="object-cover"
      />
    </div>

    <CompaniesOffer />
    <HealthyCompanies />
    <CompanyAskYourBox id="hubspot-form" />
    <div class="lg:grid lg:grid-cols-3">
      <div class="lg:col-start-2 lg:mt-6 lg:ml-20">
        <h4 class="font-recoleta-regular lg:text-[30px] lg:ml-6">
          {{ $t('companies.contactus') }}
        </h4>
        <ContactField
          :title="contact.title"
          :email="contact.email"
          :phone="contact.phone"
        />
        <div class="w-11/12 mx-auto leading-10 mb-6">
          <h4 class="font-solina-extended-medium uppercase">
            {{ t("string.misc.contact.address") }}
          </h4>
          <p class="font-recoleta-regular text-[22px]">
            Av. Lleida 32, Bellpuig (25250)
          </p>
        </div>
      </div>
      <ScheduleTable class="mt-24" />
    </div>
  </div>
</template>
