<script setup lang="ts">
const { items } = defineProps<{
  items: Item[]
}
>()
</script>

<template>
  <Panel
    :header="$t('purchase_summary.title')"
    toggleable
    collapsed
    :pt="{
      title: '!font-solina-extended-medium !text-base !font-medium',
      header: '!bg-beige-primary',
      content: '!bg-beige-primary',
    }"
    :pt-options="{
      mergeSections: true,
      mergeProps: true,
    }"
  >
    <template #togglericon="{ collapsed }">
      <span :class="[collapsed ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down', 'mdi mdi-chevron-down rounded-full border border-green-tertiary bg-green-primary h-[32px] w-[32px] text-[22px]']" />
    </template>
    <div class="py-3">
      <div class="flex gap-3">
        <NuxtImg
          class="rounded-lg"
          width="90"
          height="80"
          format="webp"
          alt="Caixa-S"
          fit="cover"
          src="/images/boxes/Caixa-S.webp"
        />
        <div class="my-auto">
          <span class="text-xs leading-3">{{ $t('purchase_summary.fromPrice') }}</span>
          <span class="text-xs font-bold">19.99</span>
          <p class="text-xs leading-3">
            Ideal para una persona
          </p>
        </div>
      </div>
      <Divider class="opacity-50" />
      <div class="flex justify-between">
        <span class="text-xs leading-3">{{ $t('purchase_summary.frequency') }}</span>
        <span class="text-xs leading-3">Cada semana</span>
      </div>
      <div class="flex justify-between mt-3">
        <span class="text-xs leading-3">{{ $t('purchase_summary.boxSize') }}</span>
        <span class="text-xs leading-3">Pequeña</span>
      </div>
      <div class="flex justify-between mt-3">
        <span class="text-xs leading-3">{{ $t('purchase_summary.boxType') }}</span>
        <span class="text-xs leading-3">Solo fruta</span>
      </div>
      <div class="flex justify-between mt-3">
        <span class="text-xs leading-3 grow">{{ $t('purchase_summary.exclusions') }}</span>
        <span class="text-xs leading-3 w-[30%]">Boniato, Pepino, Manzana, Mango, Lechuga</span>
      </div>
      <Divider class="opacity-50" />
      <div class="flex justify-between mt-3 font-solina-extended-medium">
        <span class="text-xl leading-3">{{ $t('purchase_summary.total') }}</span>
        <span class="text-xl leading-3">19.99€</span>
      </div>
      <Divider class="opacity-50" />
    </div>
  </Panel>
</template>
