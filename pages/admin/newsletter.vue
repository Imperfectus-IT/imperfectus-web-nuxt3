<template>
  <div>
    <h4 class="font-recoleta-regular text-[30px] lg:text-[40px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <div
      class="lg:flex lg:flex-row lg:justify-evenly"
    >
      <div
        class="lg:border-[1px] lg:order-2 lg:p-6 lg:rounded-lg lg:my-auto lg:flex lg:flex-col lg:w-1/2"
      >
        <p class="mt-6 lg:mt-0">
          {{ $t(`${textData}description_1`) }}
        </p>
        <p class="mt-2">
          {{ $t(`${textData}description_2`) }}
        </p>
        <InputText
          v-model="email"
          class="rounded-none border-0 border-b border-green-tertirary"
          type="text"
          :placeholder="$t(`${textData}inputPlaceholder`)"
        />
        <Button
          label="Enviar"
          class="mt-4 lg:w-1/4"
          @click="subscribeToNewsletter"
        />
      </div>
      <div
        class="lg:border-[1px] lg:order-2 lg:p-6 lg:rounded-lg lg:my-auto lg:flex lg:flex-col lg:w-1/2"
      >
        <p class="mt-6 lg:mt-0">
          {{ $t(`${textData}subscribed.description`) }}
        </p>
        <Button
          severity=""
          label="Enviar"
          class="mt-4 lg:w-1/4"
          @click="subscribeToNewsletter"
        />
      </div>
      <NuxtImg
        src="/images/admin/newsletter/newsletter.webp"
        alt="newsletter"
        format="webp"
        loading="lazy"
        class="w-full mt-8 lg:order-1 lg:w-[500px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    ca: '/el-meu-compte/newsletter',
    es: '/mi-cuenta/newsletter',
  },
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
// const { user } = useGetUserHandler()
const textData = 'newsletter.'
const email = ref<string>('')
// const isUserSubscribed = computed(() => user.value.marketingInfoComm)
const subscribeToNewsletter = () => {
  console.log('NEWSLETTER')
}
</script>
