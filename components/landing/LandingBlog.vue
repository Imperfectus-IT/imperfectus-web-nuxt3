<template>
  <div class="text-center ">
    <h2 class="font-recoleta-regular text-[35px] leading-10 mt-10 mb-6 text-wrap">
      {{ $t('blogPosts.title') }}
    </h2>
    <p>
      {{ $t('blogPosts.description') }}
    </p>
    <div class="grid grid-cols-2 gap-4 mt-10 mb-10">
      <template
        v-for="(post, index) in blogPosts"
        :key="index"
      >
        <div class="bg-green-quaternary text-green-tertiary rounded-b-lg min-h-[275px] flex flex-col shadow-gray-secondary shadow-md ">
          <div>
            <NuxtImg
              class="max-h-36 w-full rounded-t-lg"
              :src="post.imageUrl"
              :alt="post.title"
            />
            <p class="text-left mt-3 pl-3 font-bold text-sm">{{ post.title }}</p>
          </div>
          <NuxtLink
            :to="post.link"
            class="mt-auto mb-3"
          >
            <p class="text-left pl-3 underline">
              {{ $t('blogPosts.read') }}
            </p>
          </NuxtLink>
        </div>
      </template>
    </div>
    <Button
      class=""
      :label="$t('blogPosts.visit')"
      severity="secondary"
      :pt="{
        label: 'px-6 text-green-primary font-solina-extended font-bold' }"
    />
  </div>
</template>

<script setup lang="ts">

 
const blogPosts = ref([
  {
    index: 1,
    imageUrl: "https://blog.talkualfoods.com/hubfs/Caja%20XL.png",
    link: "https://blog.talkualfoods.com/beneficios-comer-fruta-verdura",
    title: "Beneficios de comer fruta y verdura"
  },
  {
    index: 2,
    title: 'Propiedades de las verduras', 
    imageUrl: 'https://blog.talkualfoods.com/hubfs/Caja%20M_Verdura%283%29.jpg', 
    link: 'https://blog.talkualfoods.com/propiedades-verduras'
  },
  {
    index: 3,
    title: 'Propiedades de las frutas', 
    imageUrl: 'https://blog.talkualfoods.com/hubfs/Frutas.jpg', 
    link: 'https://blog.talkualfoods.com/propiedades-frutas'
  },
  {
    index: 4,
    title: 'Beneficios y propiedades de la chirimoya', 
    imageUrl: 'https://blog.talkualfoods.com/hubfs/Chirimoya.png', 
    link: 'https://blog.talkualfoods.com/beneficios-chirimoya'
  }
])

</script>