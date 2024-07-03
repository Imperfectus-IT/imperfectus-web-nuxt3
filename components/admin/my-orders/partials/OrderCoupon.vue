<template>
  <h4
    v-if="showTitle"
    class="text-[14px] whitespace-normal font-bold mt-4"
  >
    {{ $t('orderCoupon.message') }}
  </h4>
  <InputGroup class="my-2 lg:w-ful flex flex-row">
    <InputText
      class="rounded-l-xl max-h-[42px] lg:w-1/2"
      placeholder="¿Código de descuento?"
    />
    <Button
      label="Aplicar"
      :pt="{ label: '', root: 'max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] bg-green-primary border-[1px] border-green-tertiary rounded-r-lg  hover:bg-green-tertiary hover:text-green-primary focus:bg-green-tertiary focus:text-green-primary' }"
    />
  </InputGroup>
</template>

<script setup lang='ts'>
const { showTitle } = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
})
</script>
