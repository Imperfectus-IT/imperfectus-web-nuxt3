<script setup lang="ts">
defineEmits(['goToStep'])
const {
  REGISTER_EVENT,
  LOGIN_EVENT,
  componentRender,
  loadComponent,
} = useAuth()
</script>

<template>
  <RegisterForm
      v-if="componentRender === REGISTER_EVENT"
      class="mt-8"
      @user-registered="$emit('goToStep', SHIPPING_STEP)"
      @auth-form-requested="loadComponent"
  >
    <template #backButton>
      <BackButton @go-to-back="$emit('goToStep', RESUME_ITEM_STEP)" />
    </template>
  </RegisterForm>
  <LoginForm
      v-if="componentRender === LOGIN_EVENT"
      class="mt-8"
      @login="$emit('goToStep', SHIPPING_STEP)"
      @auth-form-requested="loadComponent"
  >
    <template #backButton>
      <BackButton @go-to-back="$emit('goToStep', RESUME_ITEM_STEP)" />
    </template>
  </LoginForm>
</template>
