<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <section>
    <LoginForm>
      <template #header>
        <div class="mb-5">
          <span class="font-recoleta text-lg font-normal">{{ $t('loginForm.login') }}</span>
        </div>
      </template>
    </LoginForm>
  </section>
</template>

<style scoped lang="scss">

</style>
