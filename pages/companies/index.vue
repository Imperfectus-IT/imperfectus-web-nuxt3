<template>
  <div class="bg-[#fffae8] font-serif pb-[125px] flex flex-col">
    <Header
      :title="$t('companies.wantBeHealthy.1') + '\n' + $t('companies.wantBeHealthy.2')"
      background-color="#b79f85"
      background-desktop="/images/companies/header.jpg"
    />

    <Container class="flex flex-col gap-0 pl-4 pr-4 pb-1.5 lg:flex-row lg:gap-12">
      <div
        class="flex flex-col text-lg lg:text-xl lg:max-w-[50%] lg:mt-[5px]"
      >
        <SectionTitle
          :is-title-h1="true"
          :value="$t('companies.title')"
          class="mt-12 mb-6"
          title-class="mb-4"
        />

        <p class="mb-[35px] font-solina-extended-book text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]">
          {{ $t('companies.description') }}
        </p>

        <h3 @click="scrollIntoView('reasons')">
          <Link
            :text="$t('companies.whoItWorks')"
            :show-dot="true"
          />
        </h3>
      </div>

      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] ml-[15px] bg-green-primary lg:h-full" />

      <div class="flex flex-col text-lg lg:text-xl lg:max-w-[50%] lg:mt-[5px]">
        <SectionTitle
          class="mt-12 mb-6"
          is-title-h2
          :value="$t('companies.lgd.title')"
          title-class="mb-4"
        />

        <p class="mb-[35px] font-solina-extended-book text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]">
          {{ $t('companies.lgd.description.1') }}
          <strong>{{ $t('companies.lgd.description.2.bold') }}</strong>
          {{ $t('companies.lgd.description.3') }}
        </p>

        <h3>
          <Link
            :text="$t('companies.lgd.ask')"
            path="empresa@talkualfoods.com"
            :show-dot="true"
            :is-e-mail="true"
          />
        </h3>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Link from '~/components/share/Link.vue';

const scrollIntoView = (id: string) => {
  console.info('scrollIntoView:', id);
}
</script>
