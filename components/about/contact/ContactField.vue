<template>
  <div class="font-recoleta-regular text-[22px] my-8 w-10/12 mx-auto leading-10">
    <h4 class="font-solina-extended-book text-[15px] font-bold uppercase">{{ title }}</h4>
    <p><span>Email: </span>{{ email }}</p>
    <p><span>Teléfono: </span>{{ phone }}</p>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string;
  email: string;
  phone: string;
}>();

</script>