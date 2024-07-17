<script setup lang="ts">
import { RESUME_ITEM_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'
defineEmits(['goToStep'])
const {
  REGISTER_EVENT,
  LOGIN_EVENT,
  componentRender,
  loadComponent,
  handleLoginEvent,
  handleRegisterEvent
} = useAuth()
</script>

<template>
  <RegisterForm
      v-if="componentRender === REGISTER_EVENT"
      class="mt-8"
      @user-registered="handleRegisterEvent"
      @auth-form-requested="loadComponent"
  >
    <template #backButton>
      <BackButton @go-to-back="$emit('goToStep', RESUME_ITEM_STEP)" />
    </template>
  </RegisterForm>
  <LoginForm
      v-if="componentRender === LOGIN_EVENT"
      class="mt-8"
      @login="handleLoginEvent"
      @auth-form-requested="loadComponent"
  >
    <template #backButton>
      <BackButton @go-to-back="$emit('goToStep', RESUME_ITEM_STEP)" />
    </template>
  </LoginForm>
</template>
