<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium whitespace-normal mb-4">
      {{ $t('subscriptions.subscription.coupon.title') }}
    </h4>
    <InputGroup class="my-2 lg:w-ful flex flex-row">
      <InputText
        class="rounded-l-xl max-h-[42px] lg:w-1/2"
        :placeholder="$t('subscriptions.subscription.coupon.placeholder')"
      />
      <!--    <InputGroupAddon class="h-2" /> -->
      <Button
        :label="$t('subscriptions.subscription.coupon.button')"
        :pt="{ label: 'text-[20px]', root: 'max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] bg-green-primary border-[1px] border-green-tertiary rounded-r-lg  hover:bg-green-tertiary hover:text-green-primary focus:bg-green-tertiary focus:text-green-primary' }"
      />
    </InputGroup>
  </Panel>
</template>

<script setup lang='ts'>
</script>
