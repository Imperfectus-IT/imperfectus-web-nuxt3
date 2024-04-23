
<template>
    <div class="card">
        <Steps  :model="items" />
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";

const items = ref([
    {
        label: 'Personal Info'
    },
    {
        label: 'Reservation'
    },
    {
        label: 'Review'
    }
]);

</script>
