<script setup lang="ts">
import Button from 'primevue/button'
import { type TKButtonProps, type TKButtonSlots } from './TKButton'
import TKButtonStyle from './TKButtonStyle'

const props = withDefaults(defineProps<TKButtonProps>(), {
  iconPos: 'left',
  loading: false,
  link: false,
  rounded: false,
  text: false,
  outlined: false,
  plain: false,
})
const slots = defineSlots<TKButtonSlots>()
</script>

<template>
  <Button
    v-bind="props"
    :pt="TKButtonStyle"
  >
    <slot
      v-if="slots.default"
      name="default"
    />
    <template
      v-if="slots.icon"
      #icon="scope"
    >
      <slot
        name="icon"
        v-bind="scope"
      />
    </template>
    <template
      v-if="slots.loadingicon"
      #loadingicon="scope"
    >
      <slot
        name="loadingicon"
        v-bind="scope"
      />
    </template>
  </Button>
</template>
