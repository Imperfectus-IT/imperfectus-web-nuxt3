<script setup lang="ts">
defineEmits([GO_TO_STEP_EVENT])
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
    @user-registered="$emit(GO_TO_STEP_EVENT, RESUME_ITEM_STEP)"
    @auth-form-requested="loadComponent"
  >
    <template #backButton>
      <BackButton @go-to-back="$emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)" />
    </template>
  </RegisterForm>
  <LoginForm
    v-if="componentRender === LOGIN_EVENT"
    class="mt-8"
    @login="$emit(GO_TO_STEP_EVENT, RESUME_ITEM_STEP)"
    @auth-form-requested="loadComponent"
  >
    <template #backButton>
      <BackButton @go-to-back="$emit(GO_TO_STEP_EVENT, RESUME_ITEM_STEP)" />
    </template>
  </LoginForm>
</template>
