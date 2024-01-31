<template>
    <div class="flex flex-wrap justify-center gap-3">
        <span class="relative">
            <i class="mdi mdi-magnify absolute top-2/4 -mt-2 left-3 text-base"/>
            <InputText class="pl-10 rounded-xl" v-model="value1" type="text" placeholder="Search"/>
       </span>

        <span class="relative">
            <InputText class="rounded-xl" v-model="value2" type="text" placeholder="Escribe"/>
        </span>
        <span class="relative">
            <InputText class="rounded-none border-0 border-b border-green-tertirary" v-model="value2" type="text"
                       placeholder="Tu email"
            />
        </span>
        <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <InputText class="rounded-xl" id="username" v-model="value1" aria-describedby="username-help"/>
            <small id="username-help">Enter your username to reset your password.</small>
        </div>
        <span class="relative">
        <InputText class="rounded-xl mb-3" v-model="value1" disabled placeholder="Disabled"/>
        </span>
    </div>
</template>

<script setup>
import {ref} from 'vue';

const value1 = ref(null);
const value2 = ref(null);
</script>
