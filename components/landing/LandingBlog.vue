<template>
  <div class="text-center ">
    <h2 class="font-recoleta-regular text-[35px] leading-10 mt-10 mb-6 text-wrap">
      {{ $t('blogPosts.title') }}
    </h2>
    <p>
      {{ $t('blogPosts.description') }}
    </p>
    <p class="text-red-primary">
      FALTA GRID POSTS
    </p>
    <Button
      class="font-bold"
      :label="$t('blogPosts.visit')"
      severity="secondary"
      :pt="{
        label: 'px-6' }"
    />
  </div>
</template>

<script setup lang="ts">


</script>