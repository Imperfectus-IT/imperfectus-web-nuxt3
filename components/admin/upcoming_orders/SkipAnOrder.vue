<template>
  <div>
    <h4 class="font-bold text-[16px] mt-5">{{$t(`${fragmentName}.title`)}}</h4>
    <p class="text-[16px] mt-1">{{$t(`${fragmentName}.description`)}}</p>
    <div class="mt-3">
      <Button @click="skipOrder" primary :label="$t(`${fragmentName}.skip_button`)" class="h-2 lg:mr-4" />
      <Button @click="closeForm" outlined :label="$t(`${fragmentName}.cancel_button`)" class="h-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close-form", 'skip-order']);
const closeForm = () => emit("close-form");
const skipOrder = () => emit("skip-order");

const fragmentName = 'upcoming_orders.skip_order'

</script>
