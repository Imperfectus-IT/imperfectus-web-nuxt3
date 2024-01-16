<script setup lang="ts">
import { ButtonProps } from "./TKButton";

const props = withDefaults(defineProps<ButtonProps>(), {
  iconPos: 'left',
  loading: false,
  link: false,
  raised: false,
  rounded: false,
  text: false,
  outlined: false,
  plain: false
})
</script>

<template>
  <Button v-bind="props"/>
</template>