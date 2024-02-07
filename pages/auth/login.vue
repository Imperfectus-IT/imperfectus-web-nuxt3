<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <section>
    <LoginForm>
      <template #header>
        <div>
          <span class="font-recoleta">{{ $t('loginForm.login') }}</span>
        </div>
      </template>
    </LoginForm>
  </section>
</template>

<style scoped lang="scss">

</style>
