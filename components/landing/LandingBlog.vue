<template>
  <div class="text-center pb-5">
    <h2 class="font-recoleta-regular text-[35px] leading-10 mt-10 mb-6 text-wrap">
      {{ $t('blogPosts.title') }}
    </h2>
    <p>
      {{ $t('blogPosts.description') }}
    </p>
    <div
      class="px-2 grid grid-cols-2 gap-4 my-10 lg:grid-cols-4 lg:gap-10 lg:flex lg:justify-center"
    >
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="bg-green-quaternary text-green-tertiary rounded-b-lg min-h-[275px] flex flex-col shadow-gray-primary shadow-md lg:w-[300px] lg:h-[320px]"
      >
        <div>
          <NuxtImg
            class="w-[300px] h-[150px] lg:h-[175px] rounded-t-lg  object-cover"
            :src="post.imageUrl"
            :alt="post.title"
            loading="lazy"
            format="webp"
          />
          <p class="text-left mt-3 pl-3 font-bold text-sm">
            {{ post.title }}
          </p>
        </div>
        <div class="text-[15px] flex mt-auto">
          <NuxtLink
            :to="post.link"
            class="mt-auto mb-3"
          >
            <p class="text-left pl-3 underline mt-2">
              {{ $t('blogPosts.read') }}
            </p>
          </NuxtLink>
          <span class="mdi mdi-arrow-right ml-2 my-auto" />
        </div>
      </div>
    </div>
    <a href="https://blog.talkualfoods.com/">
      <Button
        class=""
        :label="$t('blogPosts.visit')"
        severity="secondary"
        :pt="{
          root: 'px-6 py-2.5 rounded-[5px] bg-green-tertiary text-green-primary font-solina-extended-medium hover:bg-green-primary hover:text-green-tertiary outline-none',
        }"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  displayDesktop: {
    type: Boolean,
    required: true,
  },

})
const { posts } = useBlogPostsState()
</script>
